import express from 'express';
import { getWeather } from '../services/api.service.js';
import { saveToken } from '../weather.js';

const weatherRouter = express.Router();
const settingsRouter = express.Router();

weatherRouter.get('/:city/:lng?', async (req, res) => {
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