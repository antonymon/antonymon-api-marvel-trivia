
import { Entity, Schema } from 'redis-om'
import { connection } from './redis.js'

class Request extends Entity {}

export const requestSchema = new Schema(Request, {
    path: { type: 'string' },
    data: { type: 'string' }
  }, {
    dataStructure: 'HASH'
  });

const requestRepository = connection.fetchRepository(requestSchema);
await requestRepository.createIndex();

export { requestRepository }