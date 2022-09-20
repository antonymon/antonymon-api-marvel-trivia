import libs from '../libs/index.js';

export const validateExistRedis = async (path) => {
    try {
        const data = await libs.redis.requestRepository.search()
            .where('path').equals(path).return.all();

        // eslint-disable-next-line no-console
        console.log({ validateExistRedis: data })

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ validateExistRedis: error })
        return {};
    }
}

export const createDataRedis = async (request) => {
    try {
        const data = await libs.redis.requestRepository.createAndSave(request);
        // eslint-disable-next-line no-console
        console.log({ createDataRedis: data })

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ createDataRedis: error })
        return {};
    }
}