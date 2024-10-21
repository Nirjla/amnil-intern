import { Request } from "express";
import { User } from "../repositories/user.repo";

export interface AuthRequest extends Request {
      user?: User;
}