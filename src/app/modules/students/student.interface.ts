
import { Model,Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester:Types.ObjectId;
  academicDepartment:Types.ObjectId;
  profileImg?: string;

  isDeleted:boolean;
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
