
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/error';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';



const getAllStudentfromDB = async (query:Record<string,unknown>) => {

  //const queryObj= {...query} //copy

  // search term
  // const studentSearchableField=['email','name.firstName','presentAddress']
  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm=query?.searchTerm as string;
  // }
  
  // const searchQuery= Student.find({
  //   $or:studentSearchableField.map((field)=>({
  //     [field]:{$regex:searchTerm,$options:'i'}
  //   }))
  // })

  // filtering

  // const excludeFields=['searchTerm','sort','limit','page','fields']
  // excludeFields.forEach((el)=>delete queryObj[el])

  // const filterQuery =  searchQuery.find(queryObj)
  // .populate('admissionSemester').populate({
  //   path:'academicDepartment',
  //   populate:{
  //     path:"academicFaculty"
  //   }
  // });


  // let sort='-createdAt';
  // if(query.sort){
  //   sort= query.sort as string;
  // }
  // const sortQuery=  filterQuery.sort(sort)

  // let page=1;
  // let limit=1;
  // let skip=0;

  // if(query?.limit){
  //   limit=Number(query.limit) 
  // }


  // if(query?.page){
  //   page=Number(query.page) 
  //   skip=(page-1)*limit;
  // }

  // const paginateQuery= sortQuery.skip(skip)

  // const limitQuery=  paginateQuery.limit(limit)

  // // fields limiting

  // let fields='-_v'
  // if (query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields);


  // return fieldQuery;

  const studentQuery= new QueryBuilder(Student.find()
   .populate('admissionSemester').populate({
      path:'academicDepartment',
      populate:{
        path:"academicFaculty"
      }
    }),query).search(studentSearchableFields).filter().sort().paginate().fields()

  const result= await studentQuery.modelQuery

  return result;

};


const getSingleStudentfromDB = async (id: string) => {
  //const result = await Student.findOne({ id });

  const result = await Student.findById( id )
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment', // Populate the academicDepartment field
    populate: {
      path: 'academicFaculty',
    },
  });

  //console.log(result);

  return result;
};

const updateStudentintoDB = async (id: string, payload: Partial<TStudent>) => {
  //const result = await Student.findOne({ id });

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

// create name.key=value dynamically
if (name && Object.keys(name).length) {
  for (const [key, value] of Object.entries(name)) {
    modifiedUpdatedData[`name.${key}`] = value;
  }
}

if (guardian && Object.keys(guardian).length) {
  for (const [key, value] of Object.entries(guardian)) {
    modifiedUpdatedData[`guardian.${key}`] = value;
  }
}

if (localGuardian && Object.keys(localGuardian).length) {
  for (const [key, value] of Object.entries(localGuardian)) {
    modifiedUpdatedData[`localGuardian.${key}`] = value;
  }
}




const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
  new: true,
  runValidators: true,
});
return result;
};




const deleteStudentfromDB = async (id: string) => {

  // using transaction rollback
  const session= await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findByIdAndUpdate(id,{isDeleted: true},{new:true,session}); // update our generated id , so we use findOneAndUpdate

    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
    }

    // get user _id from deletedstudent
    const userId = deletedStudent.user;

    const deltedUser= await User.findByIdAndUpdate(userId,{isDeleted: true},{new:true,session}); // update our generated id , so we use findOneAndUpdate



    if(!deltedUser){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
    
    return deletedStudent;

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }


};

export const StudentServices = {

  getAllStudentfromDB,
  getSingleStudentfromDB,
  deleteStudentfromDB,
  updateStudentintoDB 

};
