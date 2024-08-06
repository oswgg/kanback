import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import apiRoutes from './routes'
import errorHandlerMiddleware from '../utils/middlewares/ErrorHandler';

export default ({ app }: { app: express.Application }) => {

    app.use(express.json())
    app.use(morgan("tiny"))
    app.use(passport.initialize())

    app.use('/api', apiRoutes())


    app.use(errorHandlerMiddleware)

    
}
