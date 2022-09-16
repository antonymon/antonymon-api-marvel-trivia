import dotenv from 'dotenv';
dotenv.config()

const server = {
    NODE_PORT: process.env.NODE_PORT,
    NODE_APP_SINGUP_REGISTER_ADMIN: process.env.NODE_APP_SINGUP_REGISTER_ADMIN,
}

export default server;

