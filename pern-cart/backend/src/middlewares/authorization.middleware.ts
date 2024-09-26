import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../db/dataSource"
import { User } from "../entity/User.entity"
import { IAuthenticatedRequest, IUser } from "../interfaces/interfaces"

export const authorization = (roles: string[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
            const user = req.user as IUser
            if (!user) {
                  return res.status(401).json({ message: "Unauthorized" })
            }
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({
                  where: { id: user?.id }
            });
            if (!existingUser) {
                  return res.status(404).json({ message: "User not found" })
            }
            if (!roles.includes(existingUser.role)) {
                  return res.status(403).json({ message: "Forbidden" });
            }
            next();


      }
}