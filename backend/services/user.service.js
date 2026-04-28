import { User } from "../schema/user.schema.js";

export const UserService = {
  async findUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    return user;
  },
  async GetAllUser(){
    return await User.find();
  }
}