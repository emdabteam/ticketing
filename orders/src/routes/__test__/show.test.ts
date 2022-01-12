import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  // Create ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 40
  });
  await ticket.save();

  const user = global.signup();
  // make a request to build an order with this ticket
  const {body: order} = await request(app)
    .post('/api/orders/')
    .set('Cookie', user)
    .send( {ticketId: ticket.id } )
    .expect(201);
  
  // make request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchOrder.id).toEqual(order.id);

});

it('returns an error if a user tries to fetch other users order', async () => {
  // Create ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 40
  });
  await ticket.save();

  const user = global.signup();
  const user2 = global.signup();
  // make a request to build an order with this ticket
  const {body: order} = await request(app)
    .post('/api/orders/')
    .set('Cookie', user)
    .send( {ticketId: ticket.id } )
    .expect(201);
  
  // make request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user2)
    .send()
    .expect(401);

});