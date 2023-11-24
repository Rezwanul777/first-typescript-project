import validator from 'validator';
import { Schema, model } from 'mongoose';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

import config from '../../config';
import bcrypt from 'bcrypt';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First name cannot be more than 20  '],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not a valid',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength:[20,'Password cannot be more than 20'] },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuradianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    message: '{VALUE} is not a valid image',
    default: 'active',
  },
  isDeleted:{
    type: Boolean,
    default: false,
  }
},{
  toJSON:{
    virtuals:true
  }
});

// virtual
studentSchema.virtual('fullName').get(function (){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// pre save middleware/hook, will work on create() save
studentSchema.pre('save', async function (next) {
  //console.log(this, 'it will save');
  // hashing password saved
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user=this;
  user.password=await bcrypt.hash(user.password,Number(config.bcrypt_salt_round));
  next()

});
// post save middleware/hook, 
studentSchema.post('save', function (doc,next) {
 doc.password='';
 next()
});

// query Middleware
studentSchema.pre('find',function(next){
  this.find({isDeleted: {$ne: true}})
  next()
  
})
studentSchema.pre('findOne',function(next){
  this.find({isDeleted: {$ne: true}})
  next()
  
})
studentSchema.pre('aggregate',function(next){
  //console.log(this.pipeline());
  
  this.pipeline().unshift({$match:{isDeleted:{$ne: true}}})
  next()
  
})


studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
