import jwt from 'jsonwebtoken'
import { User } from '../schema/user.schema.js'
import { UserService } from './user.service.js';
import bcrypt from 'bcrypt';

export const authService = {
  async login({ email, password }) {
    console.log(email,'email')
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = {
      userId: user._id,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  },

  async registerUser({ name, email, password }) {
    if (!name || !email || !password) throw new Error('name&emai&password is required');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password });
    return {
      message: 'SignUp Successfully',
      user
    }
  }
}

