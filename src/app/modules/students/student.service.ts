
import { Student } from './student.model';




const getAllStudentfromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:"academicFaculty"
    }
  });
  return result;
};


const getSingleStudentfromDB = async (id: string) => {
  //const result = await Student.findOne({ id });

const result = await Student.findById(id).populate('admissionSemester').populate({
  path:'academicDepartment',
  populate:{
    path:"academicFaculty"
  }
});

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
