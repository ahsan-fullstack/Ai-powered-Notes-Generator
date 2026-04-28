import express from 'express'
import chatRoute from './api/routes/chat.route.js';
import cors from 'cors';
import upload from './api/middlware/fileUpload.js';
import dotenv from 'dotenv';
import http from 'http'
import { ChatGateWay } from './chatGateway/chat.gateway.js';
import authRoute from './api/routes/auth.route.js';
import { connectDB } from './utils/connectionDB.js';

dotenv.config();
await connectDB();
const app = express();
const port = 3000;
const server = http.createServer(app)

app.use(express.json())


app.use(cors({
    origin: '*'
}));

app.use('/chat', chatRoute)
app.use('/auth', authRoute)

ChatGateWay(server);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
