import { Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.utils";
import { ChatService } from "../services/chat.service";
import { AuthRequest } from "../interfaces/interfaces";


export class ChatController {
      private chatService: ChatService;
      constructor() {
            this.chatService = new ChatService();
      }


      create = async (req: AuthRequest, res: Response) => {
            try {
                  const roomData = req.body
                  const userId = req.user!.id;
                  console.log("RoomData", roomData)
                  const chat = await this.chatService.create(roomData, userId)
                  if (chat) {
                        sendSuccessResponse(res, "User chats", chat, 201)
                  }
            } catch (err) {
                  console.log("Create err", err)
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {
                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }

      getAllRooms = async (req: AuthRequest, res: Response) => {
            try {
                  const rooms = await this.chatService.findAll()
                  sendSuccessResponse(res, "User Chats", rooms, 200)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {

                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }

      getRoomById = async (req: AuthRequest, res: Response) => {
            try {
                  const { id } = req.params
                  const room = await this.chatService.findOne(id)
                  sendSuccessResponse(res, "User Chats", room, 200)

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