import path from "path";
import swaggerJsdoc from "swagger-jsdoc"
const options = {
      definition: {
            openapi: "3.0.0",
            info: {
                  title: 'E-commerce Api',
                  version: '1.0.0',
                  description: 'Api Documentation for the E-commerce project'
            },
            servers: [
                  {
                        url: 'http://localhost:5000/api'
                  }
            ]
      },
      apis: [path.join(__dirname, '../routes/*.ts')],
}

const swaggerSpec = swaggerJsdoc(options);
export { swaggerSpec };
