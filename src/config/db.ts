// src/config/connectDb.ts
import { AppDataSource } from './data-source';
import { User } from '../entities/user.entity';
import { Express } from 'express';

export const connectDb = async () => {
   try {
      await AppDataSource.initialize();
      console.log('✅ Connected to MySQL');
   } catch (err) {
      console.error('❌ DB connection error:', err);
      process.exit(1); // Exit the process if DB failss  
   }
};
