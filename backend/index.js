import express from 'express'
import chatRoute from './api/routes/chat.route.js';
import cors from 'cors';
import upload from './api/middlware/fileUpload.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;


app.use(cors({
    origin: '*'
}));
app.use('/chat', chatRoute)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
