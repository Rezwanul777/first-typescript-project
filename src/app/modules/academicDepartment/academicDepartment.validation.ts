import { z } from 'zod';

const createAcademicDepartmentValidationSchema=z.object({
       body:z.object({

        name:z.string({
            
            invalid_type_error:'Academic Department must be string',
            required_error:'Name is reqiured'
    
    
        }),

        academicFaculty:z.string({
            
            invalid_type_error:'Academic Faculty must be string',
            required_error:'Faculty is reqiured'
    
    
        }),
             
        })
})

const updateAcademicDepartmentValidationSchema=z.object({
    body:z.object({

     name:z.string({
         
         invalid_type_error:'Academic Department must be string',
         required_error:'Name is reqiured'
 
 
     }).optional(),

     academicFaculty:z.string({
         
         invalid_type_error:'Academic Faculty must be string',
         required_error:'Faculty is reqiured'
 
 
     }).optional(),
          
     })
})

export const AcademicDepartmentValidation=({
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema

})