import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemister } from "./academicSemister.model";
import { TAcademictpeSemister } from "./academicTypeSemister.interface";



const createAcademicSemesterIntoDB=async(payload:TAcademictpeSemister)=>{

    // semester name-- semester code => check or validation

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid Semester code')
    }

    const result=await AcademicSemister.create(payload)
    return result;
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemister.find();
    return result;
  };
  
  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemister.findById(id);
    return result;
  };
  
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademictpeSemister>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
  

export const AcademicSemesterServices={
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}