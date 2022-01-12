import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20
    });
  } catch(err) {
    console.log(err);
  }

  // old solution
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });

  // my stupid solution
  // const data: TicketCreatedEvent["data"] = {
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // };

  // const data2: string = JSON.stringify(data);

  // stan.publish(Subjects.TicketCreated, data2, () => {
  //   console.log('Event published');
  // });

});