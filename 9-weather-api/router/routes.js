import express from 'express';
import { getWeather } from '../services/api.service.js';

const weatherRouter = express.Router();

weatherRouter.get('/:city', async (req, res) => {
    const weather = await getWeather(req.params.city);
    if (!weather) {
       return res.send('Город не найден')
    }
    res.send(weather);
});

export { weatherRouter };