import {  RequestHandler } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';
import { catchAsync } from "../../utils/catchAsync";

const createStudent:RequestHandler = catchAsync(async (req, res) => {
    
  
      // create joi schema validation
     
      const {password, student: studentData } = req.body;
  
      //const{error,value}=studentValidationSchema.validate(studentData);
  
     // const zodParseData=StudentZodValidationSchema.parse(studentData)
      // call services
      const result = await UserService.createStudentIntoDB(password, studentData);
  
    //  if(error) {
    //   return  res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error:error.details,
    //   });
    //  }
      
      
      // send response
      // res.status(200).json({
      //   success: true,
      //   message: 'Student created successfully',
      //   data: result,
      // });

      sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Student created successfully',
        data: result
      });
    
  })

export const UserController={
  createStudent,
}