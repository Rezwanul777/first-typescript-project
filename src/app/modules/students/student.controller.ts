import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { StudentZodValidationSchema } from './student.validation';



const createStudent = async (req: Request, res: Response) => {
  try {

    // create joi schema validation
   
    const { student: studentData } = req.body;

    //const{error,value}=studentValidationSchema.validate(studentData);

    const zodParseData=StudentZodValidationSchema.parse(studentData)
    // call services
    const result = await StudentServices.createStudentIntoDB(zodParseData);

  //  if(error) {
  //   return  res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong',
  //     error:error.details,
  //   });
  //  }
    
    
    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
     res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error:error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentfromDB();
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  singleStudent,
};
