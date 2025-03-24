import { registerAs } from "@nestjs/config";

 export default registerAs('config', () => {
    return {
        postgres: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: parseInt(process.env.DB_PORT as string, 10),
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
    }
  })