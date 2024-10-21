import { Repository } from "typeorm";
import { Message } from "../repositories/message.repo";
import { AppDataSource } from "../configs/db.config";
import { CreateMessageDTO } from "../dtos/user.dto";
import { User } from "../repositories/user.repo";
import { ChatRoom } from "../repositories/chat.repo";

export class MessageService {
      private messageRepository: Repository<Message>;
      private userRepository: Repository<User>;
      private chatRoomRepository: Repository<ChatRoom>;
      constructor() {
            this.messageRepository = AppDataSource.getRepository(Message)
            this.userRepository = AppDataSource.getRepository(User)
            this.chatRoomRepository = AppDataSource.getRepository(ChatRoom)
      }

      async createMessage(data: CreateMessageDTO, senderId: string) {
            try {
                  // console.log("sender", senderId)
                  const sender = await this.userRepository.findOneBy({ id: senderId });
                  // console.log("Senderdetails", sender)
                  if (!sender) {
                        throw new Error('Sender not found');
                  }
                  const chatRoom = await this.chatRoomRepository.findOneBy({ id: data.chatRoomId });
                  if (!chatRoom) {
                        throw new Error('Chat room not found');
                  }

                  const message = this.messageRepository.create({
                        content: data.content,
                        sender,
                        chatRoom
                  });

                  return await this.messageRepository.save(message);
            } catch (err) {
                  console.error(err)
                  throw new Error('Message not created')
            }
      }

      async getMessages(chatRoomId: string) {
            try {
                  const messages = await this.messageRepository.find({
                        where: {
                              chatRoom: {
                                    id: chatRoomId
                              }
                        },
                        relations: ['sender'], // Include the sender relationship
                        order: {
                              created_at: 'ASC' // Order messages by creation time
                        }
                  })
                  // console.log("CM", messages)
                  return messages
            } catch (err) {
                  throw new Error('No Messages found')
            }
      }


}