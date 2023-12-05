import express from 'express';
import { AcademicSemesterController } from './academicSemester.controllers';
import validateRequset from './../../middlewares/validateRequest';
import { academicSemisterValidations } from './academicSemister.validation';


const router = express.Router();

router.post('/create-academic-semester',validateRequset(academicSemisterValidations.createAcademicSemisterValidationSchema),AcademicSemesterController.createAcademicSemester)

router.get(
    '/:semesterId',
    AcademicSemesterController.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequset(academicSemisterValidations.updateAcademicSemesterValidationSchema,
    ),AcademicSemesterController.updateAcademicSemester,
  );

  
  router.get('/', AcademicSemesterController.getAllAcademicSemesters);
// router.get('/', StudentControllers.getAllStudents);
// router.get('/:studentId', StudentControllers.singleStudent);
// router.delete('/:studentId', StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;