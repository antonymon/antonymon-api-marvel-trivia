import { Entity, Schema } from 'redis-om'
import { Client } from 'redis-om'

import config from '../config/index.js';


const url = config.server.NODE_REDIS_URL;
const client = await new Client().open(url);

class Request extends Entity {}

const requestSchema = new Schema(Request, {
    path: { type: 'string' },
    data: { type: 'string' }
  })

export const requestRepository = client.fetchRepository(requestSchema)

await requestRepository.createIndex()