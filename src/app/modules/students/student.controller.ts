

import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res) => {
  
    const result = await StudentServices.getAllStudentfromDB();
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  }
)

const singleStudent =catchAsync(async (req, res) => {
 
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentfromDB(studentId);
  
  res.status(200).json({
    success: true,
    message: 'Single student gets successfully',
    data: result,
  });
} ) 

const deleteStudent = catchAsync(async (req, res) => {
 
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student deletes successfully',
      data: result,
    });
  } 
);


export const StudentControllers = {

  getAllStudents,
  singleStudent,
  deleteStudent
};
