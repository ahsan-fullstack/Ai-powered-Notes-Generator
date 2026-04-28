import { authService } from "../../services/auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const LoginController = asyncHandler(async (req, res) => {
    console.log(req.body,'body' )
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result)
})


export const RegisterController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });
    res.status(201).json(result);
})