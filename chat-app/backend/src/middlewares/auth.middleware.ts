import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import constants from "../constants";
import { AppDataSource } from "../configs/db.config";
import { User } from "../repositories/user.repo";
import { AuthRequest } from "../interfaces/interfaces";
import { sendErrorResponse } from "../utils/response.utils";
const { JWT_SECRET } = constants
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
            const authHeader = req.header('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  throw new Error('No token provided');
            }
            const token = authHeader.split(' ')[1]
            const decoded = verify(token, JWT_SECRET || '') as { userId: string }
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOneBy({ id: decoded.userId })
            if (!user) {
                  throw new Error('User not found')
            }
            req.user = user
            next()
      } catch (err) {
            sendErrorResponse(res, "Unauthorized", 401)
      }
}