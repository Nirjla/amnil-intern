import { Server } from "socket.io";
import { produceMessage, runProducer } from "./kafka.service";

export class SocketService {
      private _io: Server;
      constructor() {
            console.log("Init socket service")
            this._io = new Server({
                  cors: {
                        allowedHeaders: ['*'],
                        origin: '*'
                  }
            })
      }
      public initListeners() {
            const io = this.io;
            io.on("connect", (socket) => {  //listens for the new connections
                  console.log(`New Socket Connected`, socket.id)
                  socket.on("event:message", async ({ message }: { message: string }) => {   //listen for incoming custom event named event:message 
                        console.log("New Message Rec.", message)
                        produceMessage("test-topic", message)
                  })
                  socket.on("disconnect", () => {
                        console.log("Socket disconnectedf")
                  })
            })

      }
      public emitMessage(topic: string, message: string) {
            this.io.emit(topic, message)
      }
      get io() {
            return this._io
      }
}