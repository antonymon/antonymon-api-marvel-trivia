
import { Entity, Schema } from 'redis-om'
import client from './redis.js'

class Request extends Entity {}

export const requestSchema = new Schema(Request, {
    path: { type: 'string' },
    data: { type: 'string' }
  })

export const requestRepository = client.fetchRepository(requestSchema)
await requestRepository.createIndex()