#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

const saveCity = async (city, city2, city3) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue (TOKEN_DICTIONARY.city, city);
        await saveKeyValue (TOKEN_DICTIONARY.city2, city2);
        await saveKeyValue (TOKEN_DICTIONARY.city3, city3)
        printSuccess('Города сохранены');
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async (lng) => {
    try {
        for (const key in TOKEN_DICTIONARY) {
            if (key.charAt(0) == 'c') {
                const city = await getKeyValue(key);
                const weather = await getWeather(city, lng);
                printWeather(weather)    
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
        return saveCity(args.s, args.s2, args.s3);
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