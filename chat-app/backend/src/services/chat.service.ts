import { In, Repository } from "typeorm";
import { AppDataSource } from "../configs/db.config";
import { User } from "../repositories/user.repo";
import { ChatRoom } from "../repositories/chat.repo";
import { CreateChatRoomDTO } from "../dtos/user.dto";

// @> operator means contains 
// example: [1, 2] @> [1,4, 3, 2]

export class ChatService {
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
      async findAll() {
            try {
                  const rooms = await this.chatRoomRepository.find({
                        relations: ['creator']
                  })
                  if (!rooms.length) {
                        throw new Error('No Rooms found')
                  }
                  return rooms
            } catch (err) {
                  console.error(err)
                  throw new Error("Failed to find")

            }
      }

      async findOne(id: string): Promise<ChatRoom> {
            try {
                  const room = await this.chatRoomRepository.findOne({
                        where: { id },
                        relations: ['creator', 'messages', 'messages.sender']
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


}