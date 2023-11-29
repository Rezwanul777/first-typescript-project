
import { Student } from './student.model';




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

  getAllStudentfromDB,
  getSingleStudentfromDB,
  deleteStudentfromDB
};
