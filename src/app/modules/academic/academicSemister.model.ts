import { Schema, model } from 'mongoose';

import {  TAcademictpeSemister } from './academicTypeSemister.interface';
import { AcademicSemisterCode, AcademicSemisterName, Months } from './academicSemester.constant';



const academicSemisterModel=new Schema<TAcademictpeSemister>({
   name:{
        type:String,
        required:true,
        enum:AcademicSemisterName
    },
    year:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
        enum:AcademicSemisterCode
    },
    startMonth:{
        type:String,
        required:true,
        enum:Months,
    },
    endMonth:{
        type:String,
        required:true,
        enum:Months,
    },
  
    
},
{
    timestamps:true
})


academicSemisterModel.pre('save',async function(next){
    const isSemesterExist = await AcademicSemister.findOne({
        year: this.year,
        name: this.name
    })

    if(isSemesterExist){
        throw new Error('Semester already exists')
    }
    next()
})



export const AcademicSemister=model<TAcademictpeSemister>('AcademicSemister',academicSemisterModel)