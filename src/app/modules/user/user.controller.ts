import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
  
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
      res.status(200).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    } catch (err:any) {
       res.status(500).json({
        success: false,
        message: err.message||'Something went wrong',
        error:err,
      });
    }
  };