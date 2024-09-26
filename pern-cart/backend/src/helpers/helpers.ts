import * as JWT from 'jsonwebtoken';
import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv"
import { IUser } from '../interfaces/interfaces';
import { AppDataSource } from '../db/dataSource';
import { ObjectLiteral, Repository } from 'typeorm';
dotenv.config()
const { JWT_SECRET = '' } = process.env
export const encryptPassword = async (password: string) => {
      return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, hashPassword: string) => {
      return bcrypt.compare(password, hashPassword)
}

export const generateToken = (payload: IUser) => {
      // console.log(payload)
      const token = JWT.sign(payload, JWT_SECRET, { expiresIn: '1d' })
      // console.log("token", token)
      return token
}


