import { Publisher, Subjects, TicketCreatedEvent} from "@testmd/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;


  // constructor(parameters) {
    
  // }
}
