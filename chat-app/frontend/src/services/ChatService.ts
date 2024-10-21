import { io, Socket } from "socket.io-client";
import { Message } from "../components/interfaces/interfaces";

export class ChatService {
      private socket: Socket | null = null
      private reconnectAttempts = 0;
      private readonly MAX_RECONNECT_ATTEMPTS = 15;
      constructor(private token: string) {
      }
      //connects the client to the chat server
      connect() {
            console.log("Ttoken", this.token)
            //checks if a socket is already connected or not
            if (this.socket?.connected) return
            // if not initializes the connection to the given url 
            this.socket = io('http://localhost:5001', {
                  auth: { token: this.token },
                  path: '/socket.io/',
                  //reconnection setings
                  reconnection: true,
                  reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
                  reconnectionDelay: 1000,
                  withCredentials: true, // enable credentials
                  transports: ['websocket'] // specify transport methods
            });
            this.setupSocketListeners()
      }
      private setupSocketListeners() {
            if (!this.socket) return
            //lsitens for successful connection
            this.socket.on('connection', () => {
                  console.log('Connected to chat server')
                  this.reconnectAttempts = 0
            })
            //listens for disconnections
            this.socket.on('disconnect', () => {
                  console.log('Disconnected from chat')
            })
            //connection error
            this.socket.on('connect_error', (error) => {
                  console.error('Connection Error', error)
                  this.reconnectAttempts++
                  if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
                        console.error('Max reconnection attempts reached')
                        this.disconnect()
                  }
            })
            //generic errros
            this.socket.on('error', (error) => {
                  console.log(error)
            })
      }
      //to join a specfic room
      joinRoom(chatRoomId: string) {
            if (!this.socket?.connected) return
            this.socket.emit('room:join', chatRoomId)

      }
      //leave a specific room
      leaveRoom(chatRoomId: string) {
            if (!this.socket?.connected) return
            this.socket.emit('room:leave', chatRoomId)
      }
      //send mesg to specfic room
      sendMessage(content: string, chatRoomId: string) {
            if (!this.socket?.connected) return
            this.socket.emit('message:send', { content, chatRoomId })
      }
      // Event listeners , listens for the events and triggers when anything happens in the rooms
      onUserJoin(callback: (data: { userId: string, username: string }) => void) {
            this.socket?.on('user:joined', callback)
      }
      onNewMessage(callback: (message: Message) => void) {
            this.socket?.on('message:new', callback);
      }
      onUserLeave(callback: (data: { userId: string, username: string }) => void) {
            this.socket?.on('user:left', callback)
      }
      async fetchMessages(chatRoomId: string) {
            try {
                  const response = await fetch(`/api/rooms/${chatRoomId}/messages`)
                  if (!response.ok) {
                        throw new Error('Failed to fetch messages')
                  }
                  const data = await response.json()
                  return data.data
            } catch (err) {
                  throw err
            }
      }
      // Cleanup
      disconnect() {
            if (this.socket) {
                  this.socket.disconnect();
                  this.socket = null;
            }
      }
}




// // Remove event listener
// removeListener(event: string, callback: Function) {
//       this.socket?.off(event, callback);
// }


