var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { getWeather } from '../services/api.service.js';
import { saveToken } from '../weather.js';
const weatherRouter = express.Router();
const settingsRouter = express.Router();
//  Указал Promise<any>, так как функция возвращает ответ от axios,
//  не понял как типизировать ответ
weatherRouter.get('/:city/:lng?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.lng) {
        const weather = yield getWeather(req.params.city, req.params.lng);
        return res.send(weather);
    }
    const weather = yield getWeather(req.params.city);
    if (!weather) {
        return res.send('Город не найден');
    }
    res.send(weather);
}));
settingsRouter.get('/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield saveToken(req.params.token);
    res.send('Token saved');
}));
export { weatherRouter, settingsRouter };
