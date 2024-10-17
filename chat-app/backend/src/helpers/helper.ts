import * as bcrypt from "bcrypt"
import * as JWT from "jsonwebtoken"
import constants from "../constants"
const { JWT_SECRET } = constants;
export const encryptPassword = async (password: string) => {
      return bcrypt.hash(password, 10)
}

export const comparePassword = (password: string, hashPassword: string) => {
      return bcrypt.compare(password, hashPassword)
}

export const generateToken = (payload: JWT.JwtPayload) => {
      console.log("Payload", payload)
      const token = JWT.sign(payload, JWT_SECRET as JWT.Secret, { expiresIn: '2d' })
      return token
}
