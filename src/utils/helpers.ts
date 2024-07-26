import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const generateRandomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export const isValidPassword = (userRegPass: string, givenPass: string): boolean => bcrypt.compareSync(givenPass, userRegPass)
