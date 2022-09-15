import dotenv from 'dotenv';
dotenv.config()

const log = {
    NAME: process.env.NODE_LOG_NAME,
    LEVEL: process.env.NODE_LOG_LEVEL,
    LEVEL_ERROR_PATH: process.env.NODE_LOG_LEVEL_ERROR_PATH,
    LEVEL_DEBUG_PATH: process.env.NODE_LOG_LEVEL_DEBUG_PATH,
}

export default log;

