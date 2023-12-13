import express from 'express';
import validateRequset from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academic-department',validateRequset(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),AcademicDepartmentController.createAcademicDepartment)

router.get(
    '/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment)
  
  router.patch(
    '/:departmentId',
    validateRequset(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),AcademicDepartmentController.updateAcademicDepartment,
  );

  
  router.get('/', AcademicDepartmentController.getAllAcademicDepartments);


export const AcademicDepartmentRoutes = router;