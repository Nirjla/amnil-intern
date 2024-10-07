import { io } from "socket.io-client";

const socket = io("http://localhost:5000")

socket.on("connect", () => {
      console.log(`Connected to the server ${socket.id}`)
      socket.emit("event:message", { message: "Hello World" })

})

// socket.on('')