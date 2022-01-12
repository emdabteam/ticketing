import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@testmd/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";


export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found!");
    }

    // here we could save an order and increment of the order version is not a problem as order is sold and will not be updated anymore
    order.set({
      status: OrderStatus.Complete,
    })
    await order.save();

    msg.ack();
  }
};