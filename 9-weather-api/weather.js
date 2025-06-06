#!/usr/bin/env node
import { getArgs } from './helpers/args.js';;
import { getWeather } from './services/api.service.js';
import  express  from 'express';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { weatherRouter } from './router/routes.js';

const app = express();
const port = 8080;

 app.use('/weather', weatherRouter);

 app.use((err, req, res, next) => {
    res.status(500).send('err.message');
 });

app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту`)
});



const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue (TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (cities) => {
    if (!cities.length) {
        printError('Не передан город');
        return;
    }
    if (cities.includes(',')) {
        const citiesArr = cities.split(',');
            try {
                await saveKeyValue (TOKEN_DICTIONARY.cities, citiesArr)
                printSuccess('Города сохранены');
            } catch (e) {
                printError(e.message);
            }
    }
};

const getForcast = async (lng) => {
    try {
        for (const key in TOKEN_DICTIONARY) {
            if (key.charAt(0) == 'c') {
                const cities = await getKeyValue(key);
                for (const city of cities) {
                    const weather = await getWeather(city, lng);
                    printWeather(weather)    
                }
            };
        };
       
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
       return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.lng) {
        return getForcast(args.lng)
    }
    return getForcast();
};

initCLI();