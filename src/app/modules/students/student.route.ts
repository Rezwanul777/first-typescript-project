import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequset from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// will call controller


router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch('/:id',
validateRequset(updateStudentValidationSchema),
StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
