import { query, Request, response, Response } from "express";
import redactLogData from "./redactLogData";

const formatHTTPLoggerResponse = (req: Request, res: Response, responseBody: any) => {
      return {
            request: {
                  headers: req.headers,
                  host: req.headers.host,
                  baseUrl: req.baseUrl,
                  url: req.url,
                  method: req.method,
                  body: redactLogData(req.body),
                  params: req?.params,
                  query: req?.query,
                  clientIp: req?.headers['x-forwarded-for'] ?? req?.socket.remoteAddress
            },
            response: {
                  headers: res.getHeaders(),
                  statusCode: res.statusCode,
                  body: redactLogData(responseBody)
            }
      }
}

export default formatHTTPLoggerResponse