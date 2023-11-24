import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //const result = await StudentModel.create(student);
  const student = await new Student(studentData);

  if(await student.isUserExists(studentData.id)){
    throw new Error('Student already exists')
  }

  const result = student.save(); // built in instant method
  return result;
};

const getAllStudentfromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentfromDB = async (id: string) => {
  //const result = await Student.findOne({ id });

const result = await Student.aggregate([
  {$match:{id: id}},
])

  return result;
};
const deleteStudentfromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted: true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentfromDB,
  getSingleStudentfromDB,
  deleteStudentfromDB
};
