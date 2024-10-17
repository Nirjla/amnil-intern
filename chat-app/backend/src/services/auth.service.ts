import { Repository } from "typeorm";
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from "../dtos/user.dto";
import { comparePassword, encryptPassword, generateToken } from "../helpers/helper";
import { User } from "../repositories/user.repo";
import { AppDataSource } from "../configs/db.config";
import constants from "../constants";
const { JWT_SECRET } = constants

export class AuthService {
      private userRepository: Repository<User>
      constructor() {
            this.userRepository = AppDataSource.getRepository(User)
      }
      async createUser(createUserDTO: CreateUserDTO): Promise<UserResponseDTO> {
            const { name, email, password } = createUserDTO
            const existingUser = await this.userRepository.findOne({
                  where: { email }
            })
            if (existingUser) {
                  throw new Error("User already exists")
            }
            const hashPassword = await encryptPassword(password)
            const user = this.userRepository.create({ name, email, password: hashPassword })
            await this.userRepository.save(user)
            const userResponseDTO: UserResponseDTO = {
                  name: user.name,
                  email: user.email,
            }
            return userResponseDTO

      }

      async loginUser(loginUserDTO: LoginUserDTO) {
            const { email, password } = loginUserDTO
            const user = await this.userRepository.findOne({ where: { email } })
            if (!user) {
                  throw new Error("User not found")
            }
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                  throw new Error("Invalid credentials")
            }
            const token = generateToken({ userId: user.id })
            const userResponseDTO: UserResponseDTO = {
                  name: user.name,
                  email: user.email,
                  token: token
            }
            return userResponseDTO
      }

      async getUsers() {
            const users = await this.userRepository.find()
            if (!users) {
                  throw new Error("No User found")
            }
            const userResponseDTO: UserResponseDTO[] = users.map(user => ({
                  name: user.name,
                  email: user.email
            }));
            return userResponseDTO
      }

      async getUserById(userId: string) {
            if (!userId) {
                  throw new Error("No UserId found")
            }
            const user = await this.userRepository.findOne({ where: { id: userId } })
            if (!user) {
                  throw new Error('User not found');
            }
            const userResponseDTO: UserResponseDTO = {
                  name: user.name,
                  email: user.email,
            }
            return userResponseDTO


      }
}