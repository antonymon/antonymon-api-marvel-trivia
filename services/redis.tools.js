import libs from '../libs/index.js';
 
export const validateExistRedis = async(path) =>{
    try {
        const data = await libs.redis.requestRepository.search()
                .where('path').equals(path).return.all();
    
        console.log({validateExistRedis: data})

        return data;
    } catch (error) {
        console.log({validateExistRedis: error})
        return {};
    }
}

export const createDataRedis = async(request) =>{
    try {
        const data = await libs.redis.requestRepository.createAndSave(request);
    
        console.log({createDataRedis: data})

        return data;
    } catch (error) {
        console.log({createDataRedis: error})
        return {};
    }
}