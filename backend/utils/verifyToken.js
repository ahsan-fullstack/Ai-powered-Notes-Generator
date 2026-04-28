import jwt from 'jsonwebtoken'
export const verifyToken = (token) => {
    console.log(process.env.JWT_SECRET,' verify token ')

    return jwt.verify(token, process.env.JWT_SECRET);
}