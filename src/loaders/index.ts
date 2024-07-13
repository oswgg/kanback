import expressLoader from './express'
import express from 'express'

export default async ({ expressApp }: { expressApp: express.Application }) => {
    expressLoader({ app: expressApp })
}
