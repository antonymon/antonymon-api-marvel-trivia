import dotenv from 'dotenv';
dotenv.config()

const auth = {
    SECRET: process.env.SECRET
}

export default auth;