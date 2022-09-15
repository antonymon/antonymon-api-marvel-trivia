import dotenv from 'dotenv';
dotenv.config()

const apiMarvel = {
    MARVEL_API_PUBLIC_URL: process.env.MARVEL_API_PUBLIC_URL,
    MARVEL_API_PUBLIC_KEY: process.env.MARVEL_API_PUBLIC_KEY,
    MARVEL_API_PRIVATE_KEY: process.env.MARVEL_API_PRIVATE_KEY
}

export default apiMarvel;

