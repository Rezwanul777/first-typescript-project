import express from 'express';
import { UserController } from './user.controller';

import { createStudentValidationSchema } from '../students/student.validation';
import validateRequset from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequset(createStudentValidationSchema),
  UserController.createStudent,
);

export const UseRoutes = router;
