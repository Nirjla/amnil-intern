import { SensitiveKeys } from "../enums/SenstiveKeys.enum";

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];

const redactLogData = (data: any): any => {
      if (typeof data === 'object' && data !== null) {
            console.log("Req&ResData", data)
            if (data.constructor && !data.constructor.name.startsWith('BaseEntity')) {
                  if (Array.isArray(data)) {
                        return data.map(item => redactLogData(item));
                  }

                  const redactedData: any = {};
                  for (const key in data) {
                        if (sensitiveKeysList.includes(key)) {
                              console.log(redactedData[key])
                              redactedData[key] = '*****'; // Redact sensitive information
                        } else {
                              // Recursively handle nested objects
                              redactedData[key] = redactLogData(data[key]);
                        }
                  }
                  return redactedData;
            } else {
                  // Skip TypeORM entity instances (e.g., User)
                  return '[Entity Instance]'; // Optionally replace with a placeholder or ignore
            }
      }
      return data;
};

export default redactLogData;
