import { Server, Socket } from "socket.io";
import { AppDataSource } from "../configs/db.config";
import { User } from "../repositories/user.repo";
import { verify } from "jsonwebtoken";
import constants from "../constants";
import { AuthService } from "./auth.service";
import { CreateMessageDTO } from "../dtos/user.dto";
import { Message } from "../repositories/message.repo";
import { MessageService } from "./message.service";
const { JWT_SECRET } = constants
export class SocketService {
      //main socket.io server instance
      private io: Server;
      private authService = new AuthService()
      private messageService = new MessageService()
      private userRepository = AppDataSource.getRepository(User)
      private messageRepository = AppDataSource.getRepository(Message)
      private activeConnections: Map<string, Socket> = new Map()
      constructor(io: Server) {
            this.io = io
            this.initializeSocketEvents()
      }
      //authenticate each socket connection using token
      private async authenticateServer(socket: Socket) {
            try {
                  console.log("Socket", socket.handshake.auth)
                  const token = socket.handshake.auth.token
                  console.log("Ttoken", token)
                  if (!token) {
                        return null
                  }
                  const decoded = verify(token, JWT_SECRET || '') as { userId: string }
                  return await this.userRepository.findOneBy({ id: decoded.userId })
            } catch (err) {
                  console.error('Socket authentication err', err)
                  throw err
            }
      }
      //main event handler
      private initializeSocketEvents() {
            this.io.on('connection', async (socket: Socket) => {
                  console.log('New connection attempt')
                  const user = await this.authenticateServer(socket)
                  if (!user) {
                        socket.emit('error', { message: 'Authentication failed' })
                        socket.disconnect()
                        return
                  }
                  console.log(`User authenticated: ${user.name}`)
                  this.activeConnections.set(user.id, socket)// store the connection
                  socket.join(`user:${user.id}`)
                  await this.authService.updateOnlineStatus(user.id, true)
                  this.io.emit('user:online', { userId: user.id })

                  this.handleRoomJoin(socket, user)
                  this.handleMessaging(socket, user)
                  this.handleDisconnection(socket, user)

            })
      }

      //listens on room join and room leave
      private handleRoomJoin(socket: Socket, user: User) {
            socket.on('room:join', (roomId: string) => {
                  socket.join(`room:${roomId}`)
                  //emits to rest of room members
                  socket.to(`room:${roomId}`).emit('user:joined', {
                        userId: user.id,
                        username: user.name
                  })
            })
            socket.on('room:leave', (roomId: string) => {
                  socket.leave(`room:${roomId}`)
                  socket.to(`room:${roomId}`).emit('user:left', {
                        userId: user.id,
                        username: user.name
                  })
            })

      }
      //listens for message sent from the client
      private handleMessaging(socket: Socket, user: User) {
            socket.on('message:send', async (data: CreateMessageDTO) => {
                  try {
                        // Handle user joining the room
                        socket.on('join', (data: { chatRoomId: string }) => {
                              socket.join(`room:${data.chatRoomId}`);
                        });
                        console.log("messageData", data)
                        console.log("UserData", user)
                        const message = await this.messageService.createMessage(data, user.id)
                        console.log("messagesaved", message)
                        this.io.to(`room:${data.chatRoomId}`).emit('message:new', {
                              id: message.id,
                              content: message.content,
                              sender: {
                                    id: user.id,
                                    username: user.name
                              },
                              createdAt: message.created_at
                        })
                  } catch (err) {
                        console.log(err)
                        socket.emit('error', { message: 'Failed to send message' })
                  }
            })
      }
      private handleDisconnection(socket: Socket, user: User) {
            socket.on('disconnect', async () => {
                  console.log(`User disconnected: ${user.name} `)
                  this.activeConnections.delete(user.id)
                  await this.authService.updateOnlineStatus(user.id, false)
                  this.io.emit('user:offline', { userId: user.id })
            })
      }

}