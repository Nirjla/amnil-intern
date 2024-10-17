import { Response } from "express";

export const sendSuccessResponse = <T>(res: Response, message: string, data: T | null, statusCode: number = 200) => {
      return res.status(statusCode).json({ success: true, message, data })

}

export const sendErrorResponse = (res: Response, message: string, statusCode: number = 400) => {
      return res.status(statusCode).json({
            success: false,
            message,
      });
}