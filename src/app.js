import express from 'express';
import cors from 'cors';
import * as usersController from './controllers/usersController.js';
import * as financialEventsController from './controllers/financialEventsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', usersController.signUp);

app.post('/sign-in', usersController.signIn);

app.post('/financial-events', financialEventsController.postNewEvent);

app.get('/financial-events', financialEventsController.getUserEvents);

app.get('/financial-events/sum', financialEventsController.getUserTotalSum);

export default app;
