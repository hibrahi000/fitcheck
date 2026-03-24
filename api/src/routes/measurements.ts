import { Router } from 'express';
import * as z from 'zod';
import prisma from '../config/prisma';
import jwt from 'jsonwebtoken';

const router = Router();

const measurementSchema = z.object({
    
});
