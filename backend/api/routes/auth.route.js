import { Router } from 'express';
import { LoginController, RegisterController } from '../controllers/authController.js';
const authRoute = Router();

authRoute.post('/login', LoginController);
authRoute.post('/SignUp', RegisterController);

export default authRoute