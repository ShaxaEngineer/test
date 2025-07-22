import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv';
import { Group } from '../entities/group.entity';

dotenv.config();

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   synchronize: true, // auto-create tables (disable in production)
   logging: false,
   entities: [User, Group],
});
