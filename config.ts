import { registerAs } from "@nestjs/config";

 export default registerAs('config', () => {
    return {
        postgres: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        ssl: process.env.DB_SSL
    }
  })