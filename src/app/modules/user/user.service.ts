/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemister } from "../academic/academicSemister.model";

import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/error";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";


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

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = 'faculty';
  //set faculty email
  //userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    //payload.profileImg = secure_url;
    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  //set admin email
  //userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // //send image to cloudinary
    // const { secure_url } = await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    //payload.profileImg = secure_url;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
  export const UserService={
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB

  }

