import dotenv from 'dotenv';
dotenv.config()

const server = {
    NODE_PORT: process.env.NODE_PORT,
    NODE_APP_SINGUP_REGISTER_ADMIN: process.env.NODE_APP_SINGUP_REGISTER_ADMIN,
    NODE_REDIS_URL: process.env.NODE_REDIS_URL,
    NODE_REDIS_USE: process.env.NODE_REDIS_USE
}

export default server;

