import config from "../../config";
import { AcademicSemister } from "../academic/academicSemister.model";

import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoDB = async (password:string, payload: TStudent) => {

  // create user object

  const userData:Partial<TUser>={}
  
  // if password is not given, default pasword

  userData.password = password||(config.default_password as string)

  // create student role
  userData.role = 'student'

  // find admission info
  const admisionSemester= await AcademicSemister.findById(payload.admissionSemester) 

 // set generated Id
  userData.id = await generateStudentId(admisionSemester)

  // create user
  const newUser = await User.create(userData);
    
// create student
if (Object.keys(newUser).length) {
  // set id , _id as user
  payload.id = newUser.id;
  payload.user = newUser._id; //reference _id

  const newStudent = await Student.create(payload);
  return newStudent;
}
};
  export const UserService={
    createStudentIntoDB
  }

