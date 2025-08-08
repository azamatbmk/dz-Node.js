#!/usr/bin/env node
import { getWeather } from './services/api.service.js';
import  express, { NextFunction, Request, Response }  from 'express';
import { printSuccess, printError } from './services/log.service.js';
import { saveKeyValue} from './services/storage.service.js';
import { settingsRouter, weatherRouter } from './router/routes.js';
import { TOKEN_DICTIONARY } from './services/constants/consnts.js'; 

const app = express();
const port = 8080;

 app.use('/weather', weatherRouter);
 app.use('/settings', settingsRouter);

 app.use(express.json());

 app.post('/weather', async (req, res) => {
    try {
        const cities: string[] = req.body.cities;
        saveCitiesArray(cities);
        const weatherPromises = cities.map(city => getWeather(city));
        const citiesWeather = await Promise.all(weatherPromises);
        printSuccess('Погода получена для городов: ' + cities)
        res.json(citiesWeather)
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении погоды');
    }
    
 })

 app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err.message);
 });

app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту`)
});



const saveToken = async (token: string) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue (TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        if(e instanceof Error) {
            printError(e.message);
        }
    }
};


const saveCitiesArray = async (cities: string[]) => {
    if (!cities.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue (TOKEN_DICTIONARY.cities, cities)
        printSuccess('Города сохранены');
    } catch (e) {
        if(e instanceof Error) {
            printError(e.message);
        }
    }

};


// const saveCity = async (cities) => {
//     if (!cities.length) {
//         printError('Не передан город');
//         return;
//     }
//     if (cities.includes(',')) {
//         const citiesArr = cities.split(',');
//             try {
//                 await saveKeyValue (TOKEN_DICTIONARY.cities, citiesArr)
//                 printSuccess('Города сохранены');
//             } catch (e) {
//                 printError(e.message);
//             }
//     }
// };

// const getForcast = async (lng) => {
//     try {
//         for (const key in TOKEN_DICTIONARY) {
//             if (key.charAt(0) == 'c') {
//                 const cities = await getKeyValue(key);
//                 for (const city of cities) {
//                     await getWeather(city, lng);
//                     // printWeather(weather)    
//                 }
//             };
//         };
       
//     } catch (e) {
//         if (e?.response?.status == 404) {
//             printError('Неверно указан город');
//         } else if (e?.response?.status == 401) {
//             printError('Неверно указан токен')
//         } else {
//             printError(e.message);
//         }
//     }
// };

// const initCLI = () => {
//     const args = getArgs(process.argv);
//     if (args.h) {
//        return printHelp();
//     }
//     if (args.s) {
//         return saveCity(args.s);
//     }
//     if (args.t) {
//         return saveToken(args.t);
//     }
//     if (args.lng) {
//         return getForcast(args.lng)
//     }
//     return getForcast();
// };

// initCLI();

// getForcast();

export { saveToken }