// src/startServer.ts
import express from 'express';
import dotenv from 'dotenv';
import router from '../routes';
import { connectDb } from '../config/db';
import { consumeFromQueue } from '../rabbit/consumer';

dotenv.config();

export const startServer = async () => {
   const app = express();
   const port = process.env.PORT || 3000;

   app.use(express.json());
   app.use('/', router);

   await connectDb();

   // ✅ Start consuming messages after DB is connected
   consumeFromQueue('user_created');

   app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
   });
};
