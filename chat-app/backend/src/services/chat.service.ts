import { In, Not, Repository } from "typeorm";
import { AppDataSource } from "../configs/db.config";
import { User } from "../repositories/user.repo";
import { ChatRoom } from "../repositories/chat.repo";
import { CreateChatRoomDTO } from "../dtos/user.dto";
import { AuthService } from "./auth.service";

// @> operator means contains 
// example: [1, 2] @> [1,4, 3, 2]

export class ChatService {
      private authService = new AuthService()
      private chatRoomRepository: Repository<ChatRoom>
      private userRepository: Repository<User>
      constructor() {
            this.chatRoomRepository = AppDataSource.getRepository(ChatRoom)
            this.userRepository = AppDataSource.getRepository(User)
      }

      async create(createChatDTO: CreateChatRoomDTO, creatorId: string) {
            try {
                  const creator = await this.userRepository.findOneBy({ id: creatorId })
                  if (!creator) {
                        throw new Error('Creator not found')
                  }
                  const chatRoom = this.chatRoomRepository.create({
                        ...createChatDTO,
                        creator
                  })
                  return await this.chatRoomRepository.save(chatRoom)
            } catch (err) {
                  console.error(err)
                  throw new Error("Failed to create chat")
            }

      }

      async findAll(userId: string, isPrivate?: boolean | undefined) {
            try {
                  const rooms = await this.chatRoomRepository.find({ where: { isPrivate: isPrivate }, relations: ['creator', 'participants'] })
                  const filteredRooms = rooms.filter(room => {
                        if (room.isPrivate) {
                              const isCreator = room.creator?.id === userId
                              console.log("isCreator", isCreator)
                              const isParticipant = room?.participants?.some(participant => participant?.id === userId)
                              console.log("isParticipant", room.participants)
                              return isCreator || isParticipant
                        }
                        return true
                  }
                  )

                  return filteredRooms
            } catch (err) {
                  console.error(err)
                  throw new Error("Failed to find")

            }
      }

      async findOne(id: string): Promise<ChatRoom> {
            try {
                  const room = await this.chatRoomRepository.findOne({
                        where: { id },
                        relations: ['creator', 'messages', 'messages.sender', 'participants']
                  })

                  if (!room) {
                        throw new Error('Chat room not found');
                  }
                  return room
            } catch (err) {
                  console.error(err)
                  throw err

            }
      }

      async checkCreator(chatId: string, creatorId: string) {
            try {
                  console.log("CreatorId", creatorId)
                  const chatRoom = await this.findOne(chatId)
                  if (!chatRoom) {
                        throw new Error('Chatroom not found')
                  }
                  if (chatRoom.isPrivate && chatRoom.creator.id !== creatorId) {
                        throw new Error('Only the creator can add participants')
                  }
                  return chatRoom
            } catch (err) {
                  console.error(err)
                  throw err
            }
      }

      async addParticipant(chatId: string, userIds: string[], creatorId: string) {
            try {
                  const chatRoom = await this.checkCreator(chatId, creatorId)

                  const existingUsers = await this.userRepository.findBy({
                        id: In(userIds)
                  })
                  if (!existingUsers.length) {
                        throw new Error('User not found')
                  }
                  const existingParticipantIds = new Set(chatRoom.participants.map(participant => participant.id))

                  const newParticipants = existingUsers.filter(user => !existingParticipantIds.has(user.id))

                  if (newParticipants.length > 0) {
                        chatRoom.participants.push(...newParticipants)
                        await chatRoom.save()

                  }
                  return chatRoom
            } catch (err) {
                  console.error(err)
                  throw new Error('Failed to add participant')
            }

      }
      async getNonParticipants(creatorId: string, chatId: string) {
            try {
                  const chatRoom = await this.findOne(chatId)
                  const users = await this.userRepository.find({
                        where: { id: Not(creatorId) }
                  })
                  const existingParticipantIds = new Set(chatRoom.participants.map(participant => participant.id))
                  const nonParticipants = users.filter(user => !existingParticipantIds.has(user.id))
                  console.log("nonPar", nonParticipants)

                  return nonParticipants
            } catch (err) {
                  console.error(err)
                  throw new Error("No Participants available")
            }
      }

      async getParticipants(chatId: string) {
            try {
                  const participants = await this.chatRoomRepository.find({
                        where: {
                              id: chatId
                        },
                        relations: ['creator', 'participants']
                  })
                  console.log("Par", participants)
                  return participants[0]
            } catch (err) {
                  console.error(err)
                  throw new Error("Creator not found")
            }
      }


}