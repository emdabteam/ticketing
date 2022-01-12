import { Publisher, Subjects, TicketUpdatedEvent} from "@testmd/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;

}
