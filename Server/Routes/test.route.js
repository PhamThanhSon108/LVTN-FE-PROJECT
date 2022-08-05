import express from 'express';
import asyncHandler from 'express-async-handler';
import { sendMail } from '../utils/nodemailler.js';
import schedule, { Job } from 'node-schedule';

const testRouter = express.Router();

testRouter.post(
    '/send-mail',
    asyncHandler(async (req, res, next) => {
        const messageOptions = {
            recipient: 'nthai2001cr@gmail.com',
            subject: 'test lần thứ n',
        };
        try {
            await sendMail(messageOptions);
            res.status(200);
            res.json('Sending mail successfully');
        } catch (error) {
            next(error);
        }
    }),
);

testRouter.get('/cron-job', (req, res) => {
    const expiredTime = 2;
    let now = Date.now().toString();
    const scheduledJob = schedule.scheduleJob(now, `*/${expiredTime} * * * * *`, () => {
        console.log(Date.now());
        let number = Math.floor(Math.random() * (10 - 0) + 0);
        console.log(`Number: ${number}`);
        if (number % 2 == 0) {
            scheduledJob.cancel();
            console.log('Job stopped');
        }
    });
    res.status(200);
    res.json('Job started');
});

testRouter.get('/verify-email/', (req, res) => {
    res.status(200);
    res.json('Here you go');
});

testRouter.get('/', (req, res) => {
    res.status(200);
    res.json('Test router');
});

export default testRouter;
