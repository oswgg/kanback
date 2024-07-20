import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes'
import ErrorHandlerMiddleware from '../utils/middlewares/ErrorHandler';

export default ({ app }: { app: express.Application }) => {

    app.use(express.json())
    app.use(morgan("tiny"))

    app.use('/api', apiRoutes())


    app.use(ErrorHandlerMiddleware)


    console.log(" \n             Now using json parse")
}
