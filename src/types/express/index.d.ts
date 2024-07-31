import express from "express";
import { User as PrismaUser } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            authUser: PrismaUser
        }
    }
}
