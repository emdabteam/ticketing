import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@testmd/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price, id } = data;
    const ticket = Ticket.build({
      id, //id: id
      title, // title: title,
      price // price: price,
    });
    await ticket.save();

    msg.ack();
  }
}
