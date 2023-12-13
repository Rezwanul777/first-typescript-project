import express from 'express';
import validateRequset from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';



const router = express.Router();

router.post('/create-academic-faculty',validateRequset(AcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyController.createAcademicFaculty)

router.get(
    '/:facultyId',
    AcademicFacultyController.getSingleAcademicFaculty
  );
  
  router.patch(
    '/:facultyId',
    validateRequset(AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),AcademicFacultyController.updateAcademicFaculty,
  );

  
  router.get('/', AcademicFacultyController.getAllAcademicFaculties);


export const AcademicFacultyRoutes = router;