import { Client } from 'redis-om';
import { createClient } from 'redis';

import config from '../config/index.js';


const url = config.server.NODE_REDIS_URL;

export const connection = createClient({ url });
await connection.connect();

const client = await new Client().use(connection);

export default client;