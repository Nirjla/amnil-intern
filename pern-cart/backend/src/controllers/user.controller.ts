import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource"
import { User } from "../entity/User.entity"
import { comparePassword, encryptPassword, generateToken } from "../helpers/helpers";
import { httpLogger } from "../lib/httpLogger";
import formatHTTPLoggerResponse from "../lib/formatHTTPLoggerResponse";

export const signup = async (req: Request, res: Response) => {
      const { name, email, password, role } = req.body
      try {
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({ where: { email } });
            if (existingUser) {
                  return res.status(400).json({ message: "User already exists" })
            }
            const hashPassword = await encryptPassword(password)
            const newUser = userRepo.create({
                  name,
                  email,
                  password: hashPassword,
                  role
            })
            await userRepo.save(newUser)
            return res.status(201).json({
                  message: "User registered successfully"
            })
      }
      catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const signin = async (req: Request, res: Response) => {
      const { email, password } = req.body
      try {
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({ where: { email } });
            if (!existingUser) {
                  return res.status(401).json({ message: "User not found" })
            }
            // console.log("re..password", password, "req..email", email)
            // console.log(existingUser.password)
            const isMatch = await comparePassword(password, existingUser.password!)
            // console.log('isMatch', isMatch)
            if (!isMatch) {
                  return res.status(401).json({ message: "Invalid email or password" })
            }
            const token = generateToken({ id: existingUser.id, role: existingUser.role });
            // console.log("ReceivedToken", token)
            res.status(201).json({
                  message: "User signin successfully",
                  user: existingUser.id,
                  token
            })
            httpLogger.info("Success", formatHTTPLoggerResponse(req, res, { token, user: existingUser.id }))
      } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' })
      }


}

export const getUsers = async (req: Request, res: Response) => {
      try {
            const userRepo = AppDataSource.getRepository(User)
            const users = await userRepo.find()
            if (!users) {
                  return res.status(400).json({ message: "No users found" })
            }
            res.status(200).json({ message: "Users found", users })
      } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' })
      }
}