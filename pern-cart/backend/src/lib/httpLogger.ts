import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
const { combine, timestamp, json, printf } = winston.format

const timestampFormat = 'MMM-DD_YY HH:mm:ss'

const logIndentation = 2

export const httpLogger = winston.createLogger({
      format: combine(
            timestamp({ format: timestampFormat }),
            json(),
            printf(({ timestamp, level, message, ...data }) => {
                  const response = {
                        level,
                        timestamp,
                        message,
                        data
                  }
                  return JSON.stringify(response, null, logIndentation)
            })
      ),
      transports: [
            new winston.transports.Console(),
            new DailyRotateFile({
                  filename: 'logs/rotating-logs-%DATE%.log',
                  datePattern: 'MMMM-DD-YYYY',
                  zippedArchive: false, //logs are not compressed
                  maxSize: '20m', //20mb
                  maxFiles: '14d' //will be kept fro 14 days then after old logs will be deleted
            })
      ]

})

