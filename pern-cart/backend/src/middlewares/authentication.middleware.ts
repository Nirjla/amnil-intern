import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import { IAuthenticatedRequest, IUser } from "../interfaces/interfaces"
dotenv.config()
const { JWT_SECRET = '' } = process.env
export const authentication = (req: Request, res: Response, next: NextFunction) => {
      const header = req.headers.authorization;
      // console.log("header", header)
      if (!header) {
            return res.status(401).json({ message: "Unauthorized" })
      }
      const token = header.split(" ")[1];
      // console.log("AuthToken", token)
      if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
      }
      const decoded = jwt.verify(token, JWT_SECRET) as IUser;
      req.user = decoded
      next()
}