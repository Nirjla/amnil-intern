import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interfaces/interfaces";
import { ChatService } from "../services/chat.service";
import { sendErrorResponse } from "../utils/response.utils";

const chatService = new ChatService()
export default async function checkCreatorMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
      try {
            const chatId = req.params.id
            const creatorId = req.user?.id
            const chatRoom = await chatService.findOne(chatId)
            if (chatRoom.isPrivate && chatRoom.creator.id === creatorId) {
                  next()
            }
            else {
                  sendErrorResponse(res, 'Only the creator can add participants', 401)
            }

      } catch (err) {
            console.error(err)
            if (err instanceof Error) {
                  sendErrorResponse(res, err.message, 400)
            }
            else {
                  sendErrorResponse(res, "An unknown error occurred", 500)
            }
      }
}