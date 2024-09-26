import { NextFunction, Request, Response } from "express";
import { httpLogger } from "../lib/httpLogger";
import formatHTTPLoggerResponse from "../lib/formatHTTPLoggerResponse";
import { SensitiveKeys } from '../enums/SenstiveKeys.enum'

const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
      const originalJSON = res.json.bind(res);
      res.json = (body: any) => {
            if (res.statusCode < 400) {
                  httpLogger.info(body.message || "Success", formatHTTPLoggerResponse(req, res, body))
            } else {
                  httpLogger.error(body.message || "Error", formatHTTPLoggerResponse(req, res, body))
            }
            return originalJSON(body)
      }
      next();
}

export default responseInterceptor