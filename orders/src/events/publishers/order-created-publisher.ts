import { OrderCreatedEvent, Publisher, Subjects } from "@testmd/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
};
