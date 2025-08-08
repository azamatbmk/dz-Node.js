var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
const getWeather = (city_1, ...args_1) => __awaiter(void 0, [city_1, ...args_1], void 0, function* (city, language = 'ru') {
    const token = yield getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }
    try {
        const { data } = yield axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                lang: language,
                units: 'metric'
            }
        });
        return data;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return null;
        }
    }
});
export { getWeather };
