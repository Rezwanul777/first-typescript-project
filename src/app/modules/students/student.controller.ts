import { Request, Response } from 'express';
import { StudentServices } from './student.service';






const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentfromDB();
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'Something went wrong',
      error:err,
  })
}
};

const singleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentfromDB(studentId);
    
    res.status(200).json({
      success: true,
      message: 'Single student gets successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'Something went wrong',
      error:err,
  })
}
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student deletes successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'Something went wrong',
      error:err,
  })
}
};


export const StudentControllers = {

  getAllStudents,
  singleStudent,
  deleteStudent
};
