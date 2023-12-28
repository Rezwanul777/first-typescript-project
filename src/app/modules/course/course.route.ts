import express from 'express';
import validateRequset from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';


const router = express.Router();

router.post('/create-course',validateRequset(CourseValidation.createCourseValidationSchema),CourseControllers.createCourse)

router.get(
    '/:id',
    CourseControllers.getSingleCourse)
  
  router.patch(
    '/:id',
    validateRequset(CourseValidation.updateCourseValidationSchema
    ),CourseControllers.updateCourse
  );

  
  router.get('/', CourseControllers.getAllCourses);
  router.delete('/:id', CourseControllers.deleteCourse)


export const CourseRoutes = router;