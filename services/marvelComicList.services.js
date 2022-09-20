import axios from "axios";
import md5 from 'blueimp-md5'
import config from '../config/index.js';

import { validateExistRedis, createDataRedis } from './redis.tools.js';

export async function marvelComicList(pageNum, req) {
    try {

        if (config.server.NODE_REDIS_USE === 'true') {
            //redis
            const path = req.originalUrl || '';
            const validateRedis = await validateExistRedis(path);
            if (validateRedis.length > 0) {
                const dataRedis = JSON.parse(validateRedis[validateRedis.length - 1].entityData.data);
                return dataRedis;
            }
            //
        }

        const url = generateUrlDianamic(pageNum);
        const { data } = await axios.get(url);

        if (config.server.NODE_REDIS_USE === 'true') {
            //redis
            const request = {
                path: req.originalUrl,
                data: JSON.stringify(data)
            }
            await createDataRedis(request);
            //
        }

        return data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}


const generateUrlDianamic = (pageNum) => {
    const publickey = config.apiMarvel.MARVEL_API_PUBLIC_KEY;
    const privatekey = config.apiMarvel.MARVEL_API_PRIVATE_KEY;

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);

    const baseUrl = `${config.apiMarvel.MARVEL_API_PUBLIC_URL}/comics`;
    let offset = parseInt(pageNum) * 20;

    if (pageNum === "0") {
        return baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    } else {
        return baseUrl + "?limit=20&offset=" + offset + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
    }
};