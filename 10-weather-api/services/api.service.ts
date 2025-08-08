import axios from 'axios';
import { getKeyValue } from './storage.service.js';
import { WeatherApiResponse } from './interfaces/weather-api.types.js';
import { TOKEN_DICTIONARY } from './constants/consnts.js'; 


const getWeather = async (city: string, language = 'ru'): Promise<WeatherApiResponse | undefined | null> => {
    const token: string = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }
    try {
        const { data } = await axios.get<WeatherApiResponse>('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                lang: language,
                units:'metric'
            }
        });
        return data;
    } catch (e) {
        if(e instanceof Error) {
            console.error(e.message);
            return null;
        }
    }
};


export { getWeather };