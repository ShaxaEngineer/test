import { Request, Response } from 'express';
import { connectDb } from '../config/db';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { Group } from '../entities/group.entity';
const userRepo = AppDataSource.getRepository(User);
const groupRepo = AppDataSource.getRepository(Group);

export const createUsers = async (req: Request, res: Response) => {
   try {
      const { name, email } = req.body;

      if (!name || !email) {
         return res.status(400).json({ message: 'Name and email are required.' });
      }
      // Check if email already exists
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) {
         return res.status(409).json({ message: 'Email already exists.' });
      }
      const newUser = userRepo.create({ name, email });
      const savedUser = await userRepo.save(newUser);
      res.status(201).json(savedUser);
   } catch (error) {
      console.error('❌ Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

//create group
export const createGroups = async (req: Request, res: Response) => {
   try {
      const { name, users } = req.body;

      if (!name || !users) {
         return res.status(400).json({ message: 'Name and users are required.' });
      }

      const newGroup = groupRepo.create({ name, users });
      const savedUser = await groupRepo.save(newGroup);
      res.status(201).json(savedUser);
   } catch (error) {
      console.error('❌ Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

export const getUsers = async (_req: Request, res: Response) => {
   try {
      const users = await userRepo.find()
      return res.json(users)
   } catch (error) {
      console.error('DB error:', error);
      res.status(500).send('Database error');
   }
};

export const getGroups = async (_req: Request, res: Response) => {
   try {
      const groups = await groupRepo.find()
      return res.json(groups)
   } catch (error) {
      console.error('DB error:', error);
      res.status(500).send('Database error');
   }
};
