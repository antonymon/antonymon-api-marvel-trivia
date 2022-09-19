import { Client } from 'redis-om'
import { createClient } from 'redis'
import config from '../config/index.js';


const url = config.server.NODE_REDIS_URL;

const connection = new Client();

await new connection.open(ur);

export { connection }