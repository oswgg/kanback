import express from 'express';
import apiRoutes from './routes'

export default ({ app }: { app: express.Application }) => {

    app.use(express.json())

    app.use('/api', apiRoutes())



    console.log(" \n             Now using json parse")
}
