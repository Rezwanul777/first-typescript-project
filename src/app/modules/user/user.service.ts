/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemister } from "../academic/academicSemister.model";

import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/error";
import httpStatus from "http-status";


const createStudentIntoDB = async (password:string, payload: TStudent) => {

  // create user object

  const userData:Partial<TUser>={}
  
  // if password is not given, default pasword

  userData.password = password||(config.default_password as string)

  // create student role
  userData.role = 'student'

  // find admission info
  const admisionSemester= await AcademicSemister.findById(payload.admissionSemester) 

    // transaction rollback
    const session= await mongoose.startSession()
  try {
    // start transaction
    session.startTransaction()
    userData.id = await generateStudentId(admisionSemester)

  // create user(transaction-1)
  const newUser = await User.create([userData],{session}); // array create
    
// create student
if (!newUser.length) {

  throw new AppError(httpStatus.BAD_REQUEST,"Failed to create user")
}

// set generated Id

  payload.id = newUser[0].id; // cause if we clg newuser we get id in  zero no index 
  payload.user = newUser[0]._id; //reference _id

   // create student(transaction-2)
  const newStudent = await Student.create([payload],{session});

  if(!newStudent.length){
    throw new AppError(httpStatus.BAD_REQUEST,"Failed to create student")
  }

  //if suuccess all sesion create user and student then commit for parmanent saving in datadase.
  await session.commitTransaction()
  // then seesion end
  await session.endSession()
  return newStudent;

  } catch (err: any) {
    // if all session failed
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
 
  
};
  export const UserService={
    createStudentIntoDB
  }

