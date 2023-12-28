import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse=catchAsync(async(req,res) => {
    const result=await courseServices.createCourseIntoDB(req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course created successfully",
        data:result

    })

})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await courseServices.getAllCoursesIntoDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course are retrieved successfully',
      data: result,
    });
  });

const getSingleCourse = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await courseServices.getSingleCourseIntoDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Course is retrieved successfully',
      data: result,
    });
  });

  const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.updateCourseIntoDB(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is Updated succesfully',
      data: result,
    });
  });
  
const deleteCourse = catchAsync(async (req, res) => {
    const {id}= req.params
    const result = await courseServices.deleteCourseIntoDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is Deleted successfully',
      data: result,
    });
  });



  export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
    
  };