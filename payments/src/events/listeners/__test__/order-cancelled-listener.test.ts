import { OrderCancelledEvent, OrderStatus } from "@testmd/common";
import mongoose from 'mongoose';
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from 'node-nats-streaming';
import { Order } from "../../../models/order";
import { OrderCancelledListener } from "../order-cancelled-listener";


const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'dasfdas',
    version: 0
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'asfasdasf'
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { msg, data, listener, order };
};

it('updates the status of the order', async () => {
  const { msg, data, listener, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { msg, data, listener, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});