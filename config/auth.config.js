import dotenv from 'dotenv';
dotenv.config()

const auth = {
    SECRET: process.env.NODE_APP_SECRET
}

export default auth;