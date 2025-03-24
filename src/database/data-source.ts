import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "my_db",
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
  logging: true,
});