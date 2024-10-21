import { Response } from "express";
import { MessageService } from "../services/message.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.utils";
import { AuthRequest } from "../interfaces/interfaces";

export class MessageController {
      private messageService: MessageService
      constructor() {
            this.messageService = new MessageService()
      }

      create = async (req: AuthRequest, res: Response) => {
            try {
                  const messageData = req.body
                  const userId = req.user!.id
                  const message = await this.messageService.createMessage(messageData, userId)
                  sendSuccessResponse(res, "Message created succussfully", message, 201)
            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {
                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }

      getRoomMessages = async (req: AuthRequest, res: Response) => {
            try {
                  const messages = await this.messageService.getMessages(req.params.chatRoomId)
                  sendSuccessResponse(res, "Messages found", messages, 200)
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