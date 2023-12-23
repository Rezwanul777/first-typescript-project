

import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';


const getAllStudents = catchAsync(async (req, res) => {

  
    const result = await StudentServices.getAllStudentfromDB(req?.query);
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  }
)
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentfromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});


const updateStudent = catchAsync(async (req, res) => {
 
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentintoDB(id, student);
  
  res.status(200).json({
    success: true,
    message: 'Single student updates successfully',
    data: result,
  });
} 
);

const deleteStudent = catchAsync(async (req, res) => {
 
    const id = req.params.id;
    const result = await StudentServices.deleteStudentfromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single student deletes successfully',
      data: result,
    });
  } 
);


export const StudentControllers = {

  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
