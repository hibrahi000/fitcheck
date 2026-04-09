import * as z from 'zod';

export const createMeasurementSchema = z
  .object({
    chest: z.number().positive().max(100).optional(),
    waist: z.number().positive().max(100).optional(),
    hips: z.number().positive().max(100).optional(),
    shoulder_width: z.number().positive().max(100).optional(),
    arm_length: z.number().positive().max(100).optional(),
    inseam: z.number().positive().max(100).optional(),
    neck: z.number().positive().max(100).optional(),
    height_inches: z.number().positive().max(100).optional(),
    weight_lbs: z.number().positive().max(1000).optional(),
    unit_system: z.enum(['IMPERIAL', 'METRIC']).default('IMPERIAL'),
    notes: z.string().max(500).optional(),
  })
  .refine(
    (data) => {
      const { unit_system, notes, ...measurements } = data;
      return Object.values(measurements).some((v) => v !== undefined);
    },
    { message: 'At least one measurement field is required' },
  );

export type CreateMeasurementInput = z.infer<typeof createMeasurementSchema>;
