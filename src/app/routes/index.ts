/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */


import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UseRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academic/academicSemister.route";


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

//moduleRoutes.forEach(route =>router.use(route.path,route.route))

export default router