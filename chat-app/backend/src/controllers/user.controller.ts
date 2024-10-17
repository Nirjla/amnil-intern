import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.utils";
import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";

const authService = new AuthService()
export const register = async (req: Request, res: Response) => {
      try {
            const user = await authService.createUser(req.body)
            // return res.status(201).json({ message: "seuces" })
            sendSuccessResponse<UserResponseDTO>(res, "User registered successfully", user, 201)
      } catch (err) {
            if (err instanceof Error) {
                  sendErrorResponse(res, err.message, 400)
            }
            else {

                  sendErrorResponse(res, "An unknown error occurred", 500)
            }
      }
}


export const login = async (req: Request, res: Response) => {
      try {
            const user = await authService.loginUser(req.body)
            sendSuccessResponse<UserResponseDTO>(res, "User Login successfully", user, 200)
      } catch (err) {
            if (err instanceof Error) {
                  sendErrorResponse(res, err.message, 400)
            }
            else {

                  sendErrorResponse(res, "An unknown error occurred", 500)
            }
      }
}

export const getUsers = async (req: Request, res: Response) => {
      try {
            const users = await authService.getUsers()
            sendSuccessResponse<UserResponseDTO[]>(res, "Lists of Users", users, 200)
      } catch (err) {
            if (err instanceof Error) {
                  sendErrorResponse(res, err.message, 400)
            }
      }
      sendErrorResponse(res, "An unknown error occurred", 500)
}

export const getUserById = async (req: Request, res: Response) => {
      try {
            const user = await authService.getUserById(req.params.id)
            sendSuccessResponse<UserResponseDTO>(res, "User Found", user)
      } catch (err) {
            if (err instanceof Error) {
                  sendErrorResponse(res, err.message, 400)
            }
      }
      sendErrorResponse(res, "An unknown error occurred", 500)
}
