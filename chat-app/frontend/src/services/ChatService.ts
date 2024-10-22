import { io, Socket } from "socket.io-client";
import { Message } from "../components/interfaces/interfaces";

export class ChatService {
      private socket: Socket | null = null
      private reconnectAttempts = 0;
      private readonly MAX_RECONNECT_ATTEMPTS = 15;
      private isConnected = false //status for tracking connection
      constructor(private token: string) {
      }
      //connects the client to the chat server
      async connect(): Promise<void> {
            return new Promise((resolve, reject) => {
                  if (this.socket?.connected) {
                        this.isConnected = true
                        resolve()
                        return
                  }
                  console.log("Connecting with token:", this.token);
                  this.socket = io('http://localhost:5001', {
                        auth: { token: this.token },
                        path: '/socket.io/',
                        reconnection: true,
                        reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
                        reconnectionDelay: 1000,
                        withCredentials: true,
                        transports: ['websocket']
                  });
                  const connectionTimeout = setTimeout(() => { //handling connection if not use wouldnt know if connection is failed or not
                        reject(new Error('Connection timeout'));
                  }, 5000);

                  this.socket.on('connect', () => {
                        console.log('Connected to chat server', {
                              socketId: this.socket?.id,
                              timestamp: new Date().toISOString()
                        });
                        this.isConnected = true
                        this.reconnectAttempts = 0;
                        clearTimeout(connectionTimeout);
                        resolve();
                  });
                  this.setupSocketListeners();

                  this.socket.on('connect_error', (error) => {
                        console.error('Connection Error:', error);
                        this.isConnected = false
                        clearTimeout(connectionTimeout);
                        reject(error);
                  });
            });
      }
      private setupSocketListeners() {
            if (!this.socket) return

            this.socket.on('message:new', (message) => {
                  console.log('receieved new message:', message)
            })
            this.socket.on('user:joined', data =>
                  console.log(`Client ${data} joined:`, data));

            this.socket.on('user:left', data => {
                  console.log(`Client ${data} left`, data)
            })
            //listens for disconnections
            this.socket.on('disconnect', () => {
                  console.log('Disconnected from chat')
                  this.isConnected = false
            })
            //connection error
            this.socket.on('connect_error', (error) => {
                  console.error('Connection Error', error)
                  this.reconnectAttempts++
                  if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
                        console.error('Max reconnection attempts reached')
                        this.disconnect()
                        this.isConnected = false
                  }
            })
            //generic errros
            this.socket.on('error', (error) => {
                  console.log(error)
                  this.isConnected = false
            })
      }
      //to join a specfic room
      async joinRoom(chatRoomId: string) {
            if (!this.isConnected) {
                  console.log('socket not connected, attempting to connect...');
                  try {
                        await this.connect();
                  } catch (error) {
                        console.error('Failed to connect:', error);
                        throw new Error('Cannot join room: Socket connection failed');
                  }
            }
            this.socket?.emit('room:join', chatRoomId)


      }
      //leave a specific room
      async leaveRoom(chatRoomId: string) {
            if (!this.isConnected) {
                  console.log('socket not connected, attempting to connect...');
                  try {
                        await this.connect();
                  } catch (error) {
                        console.error('Failed to connect:', error);
                        throw new Error('Cannot leave room: Socket connection failed');
                  }
            }
            this.socket?.emit('room:leave', chatRoomId)
      }
      // Wait for connection before sending message
      async sendMessage(content: string, chatRoomId: string): Promise<void> {
            if (!this.isConnected) {
                  console.log('socket not connected, attempting to connect...');
                  try {
                        await this.connect();
                  } catch (error) {
                        console.error('Failed to connect:', error);
                        throw new Error('Cannot send message: Socket connection failed');
                  }
            }
            console.log('Sending message:', {
                  room: chatRoomId,
                  content,
                  timestamp: new Date().toISOString()
            });
            this.socket?.emit('message:send', { content, chatRoomId });
      }
      //event listeners , listens for the events and triggers when anything happens in the rooms
      onUserJoin(callback: (data: { userId: string, username: string }) => void) {
            this.socket?.on('user:joined', callback)
      }
      onNewMessage(callback: (message: Message) => void) {
            this.socket?.on('message:new', callback);
      }
      onUserLeave(callback: (data: { userId: string, username: string }) => void) {
            this.socket?.on('user:left', callback)
      }

      // Cleanup
      disconnect() {
            if (this.socket) {
                  this.socket.disconnect();
                  this.socket = null;
                  this.isConnected = false
            }
      }
}




// // Remove event listener
// removeListener(event: string, callback: Function) {
//       this.socket?.off(event, callback);
// }


