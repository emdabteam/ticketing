import { OrderCancelledEvent, Subjects, Publisher } from "@testmd/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
};
