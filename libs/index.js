import { getLog, getClientIP, getResponseTime, errorHandler, errorParse, error, error503, error404 } from './utils.js'
import { dataRole, dataUser } from './initial.data.js'

const libs = {
    utils: {
        getLog,
        getClientIP,
        getResponseTime,
        errorHandler,
        errorParse,
        error,
        error503,
        error404
    },
    initialData: {
        dataRole,
        dataUser
    }
}

export default libs;