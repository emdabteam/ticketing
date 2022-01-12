import { PaymentCreatedEvent, Publisher, Subjects } from "@testmd/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  
};