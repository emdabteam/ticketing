import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { app } from '../app';
import { isJSDocUnknownTag } from 'typescript';

declare global {
  var signup: (id?: string) => string[]; 
};

jest.mock('../nats-wrapper');

// cheat - should be in env variable
process.env.STRIPE_KEY = 'sk_test_51KEcgFFEbQOMNzGzJSMRvvhpRW9ccJvFBp2eh8XhpVmAAMs0xBVyaDRGgH74uOkeY3aqdz3kTiXLlLqeCQ4LM0Zv00umFYBzlO';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = (id?: string) => {
  // build a JWT payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build a session object {jwt: MY_JWT}
  const session = { jwt: token };

  // turn the session into json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};