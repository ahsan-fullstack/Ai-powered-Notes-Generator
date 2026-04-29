import { Server } from "socket.io"
import { verifyToken } from "../utils/verifyToken.js"

export const ChatGateWay = (httpserver) => {
  const io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:5173", // your frontend port
      methods: ["GET", "POST"],
      credentials: true
    }
  })

   io.on('connection', async (socket) => {
    const token = socket.handshake?.auth.token;
    if (!token) {
      console.log('connection not token')
      socket.disconnect();
      return
    }

    const payload = verifyToken(token);
    const user_id = payload.userId;
    if (!user_id) {
      socket.disconnect();
      return;
    }
    socket.emit('connectedUser', { userId: user_id });
  })
}