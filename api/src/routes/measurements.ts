import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createMeasurementSchema, CreateMeasurementInput } from '../schema/measurements.schema';
import prisma from '../config/prisma';

const router = Router();

router.post(
  '/',
  authenticate,
  validate(createMeasurementSchema),
  async (req: Request<{}, {}, CreateMeasurementInput>, res: Response, next: NextFunction) => {
    try {
      const measurement = await prisma.userMeasurement.create({
        data: {
          ...req.body,
          user_id: req.user!.userId,
        },
      });
      res.status(201).json(measurement);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
