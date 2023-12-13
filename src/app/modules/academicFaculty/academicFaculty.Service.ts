import { TAcaDemicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFacultyIntoDB=async(payload:TAcaDemicFaculty)=>{

    // semester name-- semester code => check or validation

   
    const result=await AcademicFaculty.create(payload)
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
  };
  
  const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
  };
  
  const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcaDemicFaculty>,
  ) => {
    
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
  

export const AcademicFacultyServices={
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}