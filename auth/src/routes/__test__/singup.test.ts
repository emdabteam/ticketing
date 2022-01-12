import request from "supertest";

import { app } from "../../app";

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
});

it('returns a 400 with an invalid email', async ()=>{
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'testtest.com',
    password: 'password'
  })
  .expect(400)
});

it('returns a 400 with an invalid password', async ()=>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'p'
  })
  .expect(400)
});

it('returns a 400 with missing an email or password', async ()=>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: ''
  })
  .expect(400)

  return request(app)
  .post('/api/users/signup')
  .send({
    email: '',
    password: 'password'
  })
  .expect(400)
});

it('disallows duplicate emails', async ()=>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
});

it('sets the cookie after successful signup', async ()=>{
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
});