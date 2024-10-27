import { Request, Response } from "express";
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
                  const { filter } = req.query
                  const userId = req.user!.id;
                  console.log("Filter", filter)
                  let isPrivate: boolean | undefined
                  if (filter === 'Private') {
                        isPrivate = true
                  }
                  if (filter === 'Public') {
                        isPrivate = false
                  }
                  const rooms = await this.chatService.findAll(userId, isPrivate)
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

      addParticipant = async (req: AuthRequest, res: Response) => {
            try {
                  const { chatId } = req.params
                  const creatorId = req.user?.id!
                  console.log("Crea")
                  const userIds: string[] = req.body
                  const chatRoom = await this.chatService.addParticipant(chatId, userIds, creatorId)
                  sendSuccessResponse(res, "User Chats", chatRoom, 200)

            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {

                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }

      }

      getParticipants = async (req: AuthRequest, res: Response) => {
            try {
                  const creatorId = req.user?.id!
                  const chatId = req.params.chatId
                  const participants = await this.chatService.getParticipants(chatId)
                  sendSuccessResponse(res, "User Chats", participants, 200)

            } catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {

                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }
      getNonParticipants = async (req: AuthRequest, res: Response) => {
            try {
                  const creatorId = req.user?.id!
                  const chatId = req.params.chatId
                  const nonParticipants = await this.chatService.getNonParticipants(creatorId, chatId)
                  sendSuccessResponse(res, "Non Participants", nonParticipants, 200)

            }
            catch (err) {
                  if (err instanceof Error) {
                        sendErrorResponse(res, err.message, 400)
                  }
                  else {

                        sendErrorResponse(res, "An unknown error occurred", 500)
                  }
            }
      }
}