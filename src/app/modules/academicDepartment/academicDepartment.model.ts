import { Schema, model, } from 'mongoose';
import { TAcaDemicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/error';
import httpStatus from 'http-status';

const academicDepartmentSchema=new Schema<TAcaDemicDepartment>({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty',
    },
      
},
{
    timestamps:true
})



// for update query validation--- that data is exist o not

academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
    const query=this.getQuery()
    const isDepartmentExist= await AcademicDepartment.findOne(query)
    if(!isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND,"The Department Does Not Exist");
        
    } 
    next()   
})

export const AcademicDepartment=model<TAcaDemicDepartment>('AcademicDepartment',academicDepartmentSchema)