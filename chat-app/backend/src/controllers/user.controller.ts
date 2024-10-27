import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.utils";
import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";
import { AuthRequest } from "../interfaces/interfaces";


export class UserController {
      private authService: AuthService

      constructor() {
            this.authService = new AuthService()
      }

      register = async (req: Request, res: Response) => {
            try {
                  const user = await this.authService.createUser(req.body)
                  sendSuccessResponse<UserResponseDTO>(res, "User Regsitered successfully", user, 200)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {
                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }

      login = async (req: Request, res: Response) => {
            try {
                  const user = await this.authService.loginUser(req.body)
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

      getUsers = async (req: Request, res: Response) => {
            try {
                  const users = await this.authService.getUsers()
                  sendSuccessResponse<UserResponseDTO[]>(res, "Lists of Users", users, 200)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {
                        sendErrorResponse(res, "An unknown error occurred", 500)

                  }
            }
      }

      getUserById = async (req: Request, res: Response) => {
            try {
                  const user = await this.authService.getUserById(req.params.id)
                  sendSuccessResponse<UserResponseDTO>(res, "User Found", user)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {
                        sendErrorResponse(res, "An unknown error occurred", 500)

                  }
            }
      }


      getUsersNotCreator = async (req: AuthRequest, res: Response) => {
            try {
                  const creatorId = req.user?.id!
                  const participants = await this.authService.getUsersNotCreator(creatorId);
                  sendSuccessResponse(res, "Participants lists", participants, 200)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {

                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }

}