/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */


import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UseRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academic/academicSemister.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";




const router=Router()


// const moduleRoutes=[

//     {
//         path:'/users',
//         route:'UseRoutes'
//     },

//     {
    
//             path:'/students',
//             route:'StudentRoutes'
        
//     }
// ]

router.use('/students',StudentRoutes)
router.use('/users',UseRoutes)
router.use('/academicSemesters',AcademicSemesterRoutes)
router.use('/academic-faculty',AcademicFacultyRoutes)
router.use('/academic-department',AcademicDepartmentRoutes)
router.use('/faculty',FacultyRoutes)
router.use('/admin',AdminRoutes)

//moduleRoutes.forEach(route =>router.use(route.path,route.route))

export default router