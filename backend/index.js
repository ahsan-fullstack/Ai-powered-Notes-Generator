import express from 'express'
import chatRoute from './api/routes/chat.route.js';
import cors from 'cors';
import upload from './api/middlware/fileUpload.js';
import dotenv from 'dotenv';
import http from 'http'
import { ChatGateWay } from './chatGateway/chat.gateway.js';
import authRoute from './api/routes/auth.route.js';
import { connectDB } from './utils/connectionDB.js';
import { authMiddleware } from './api/middlware/auth.middleware.js';
import { documentController } from './api/controllers/document.controller.js';

dotenv.config();
await connectDB();
const app = express();
const port = 3000;
const server = http.createServer(app)

app.use(express.json())


app.use(cors({
    origin: '*'
}));

app.use('/chat', authMiddleware,chatRoute)
app.use('/auth', authRoute)
app.use('/chat/:chatId', authMiddleware, documentController)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
