#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getWeather } from './services/api.service.js';
import express from 'express';
import { printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { settingsRouter, weatherRouter } from './router/routes.js';
const app = express();
const port = 8080;
app.use('/weather', weatherRouter);
app.use('/settings', settingsRouter);
app.use(express.json());
app.post('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = req.body.cities;
        saveCitiesArray(cities);
        const weatherPromises = cities.map(city => getWeather(city));
        const citiesWeather = yield Promise.all(weatherPromises);
        printSuccess('Погода получена для городов: ' + cities);
        res.json(citiesWeather);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении погоды');
    }
}));
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту`);
});
const saveToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        yield saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    }
    catch (e) {
        if (e instanceof Error) {
            printError(e.message);
        }
    }
});
const saveCitiesArray = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cities.length) {
        printError('Не передан город');
        return;
    }
    try {
        yield saveKeyValue(TOKEN_DICTIONARY.cities, cities);
        printSuccess('Города сохранены');
    }
    catch (e) {
        if (e instanceof Error) {
            printError(e.message);
        }
    }
});
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
export { saveToken };
