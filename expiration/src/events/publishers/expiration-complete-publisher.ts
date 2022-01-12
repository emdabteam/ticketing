import { ExpirationCompleteEvent, Publisher, Subjects } from "@testmd/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
};