import express from 'express';
import { getWeather } from '../services/api.service.js';

const weatherRouter = express.Router();

weatherRouter.get('/:city', async (req, res) => {
    res.send(await getWeather(req.params.city));
});

export { weatherRouter };