import Joi from "Joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .trim()
      .regex(/^[A-Z][a-zA-Z]*$/)
      .messages({
        'any.required': 'First Name is required',
        'string.max': 'First name cannot be more than 20 characters',
        'string.pattern.base': 'First Name must start with an uppercase letter and contain only letters',
      }),
    middleName: Joi.string().trim(),
    lastName: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'any.required': 'Last Name is required',
        'string.pattern.base': 'Last Name must contain only letters',
      }),
  });
  
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema