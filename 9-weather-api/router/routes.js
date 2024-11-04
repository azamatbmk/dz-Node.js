import express from 'express';
import { getWeather } from '../services/api.service.js';

const weatherRouter = express.Router();

weatherRouter.get('/moscow', async (req, res) => {
    res.send(await getWeather('moscow'));
});

weatherRouter.get('/vladikavkaz', async (req, res) => {
    res.send(await getWeather('vladikavkaz'));
});

weatherRouter.get('/istanbul', async (req, res) => {
    res.send(await getWeather('istanbul'));
});

export { weatherRouter };