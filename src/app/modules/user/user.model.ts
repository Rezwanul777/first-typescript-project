import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema=new Schema({
    id:{
        type:String,
        required:true,
        //unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    needsPasswordChange:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:['admin','student','faculty']
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:'in-progress'
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    
},
{
    timestamps:true
})

// pre save middleware/hook, will work on create() save
userSchema.pre('save', async function (next) {
    //console.log(this, 'it will save');
    // hashing password saved
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user=this;
    user.password=await bcrypt.hash(user.password,Number(config.bcrypt_salt_round));
    next()
  
  });
  // set password empty string after saving password
  userSchema.post('save', function (doc,next) {
   doc.password='';
   next()
  });
  

export const User=model<TUser>('user',userSchema)