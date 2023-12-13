/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
// year semester code 4 digit 

import { TAcademictpeSemister } from "../academic/academicTypeSemister.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    //203001   0001
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  };
  
  export const generateStudentId = async (payload: TAcademictpeSemister) => {
    // first time 0000
    //0001  => 1
    let currentId =  (0).toString();// 0000 by default
    const lastStudentId = await findLastStudentId()

    // 2030 01 0001

    const lastStudentSemesterCode= lastStudentId?.substring(4,6) //01
    const lastStudentYear= lastStudentId?.substring(0,4)  // 2030

    const currentSemesterCode= payload.code
    const currentStudentYear= payload.year

    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentStudentYear){
      currentId = lastStudentId.substring(6) //0001
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `${payload.year}${payload.code}${incrementId}`;
  
    return incrementId;
  };
