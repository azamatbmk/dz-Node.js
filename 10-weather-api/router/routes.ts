import express, { Request, Response, Router } from 'express';
import { getWeather } from '../services/api.service.js';
import { saveToken } from '../weather.js';


const weatherRouter: Router = express.Router();
const settingsRouter: Router = express.Router();

//  Указал Promise<any>, так как функция возвращает ответ от axios,
//  не понял как типизировать ответ
weatherRouter.get('/:city/:lng?', async (req: Request, res: Response): Promise<any> => {
    if(req.params.lng) {
        const weather = await getWeather(req.params.city, req.params.lng);
        return res.send(weather);
    }
    const weather = await getWeather(req.params.city);
    if (!weather) {
       return res.send('Город не найден')
    }
    res.send(weather);
});

settingsRouter.get('/:token', async (req, res) => {
    await saveToken(req.params.token);
    res.send('Token saved')
});



export { weatherRouter, settingsRouter };