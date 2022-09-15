import axios from "axios";
import md5 from 'blueimp-md5'
import config from '../config/index.js';

export async function marvelCharacters(charactersId) {
    try {
        const url = generateUrlDianamic(charactersId);
        const { data } = await axios.get(url);
        return data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}


const generateUrlDianamic = (charactersId) => {
    const publickey = config.apiMarvel.MARVEL_API_PUBLIC_KEY;
    const privatekey = config.apiMarvel.MARVEL_API_PRIVATE_KEY;

    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);

    const baseUrl = `${config.apiMarvel.MARVEL_API_PUBLIC_URL}/characters/`;

    return baseUrl + charactersId + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
};