/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';

export const globalErrorHandler=((err:any,req:Request, res: Response,next:NextFunction)=>{
    const statusCode=err.statusCode|| 500;
   const message=err.message || "someting went wrong"
  
    return res.status(statusCode).json({
      success:false,
      message:message,
      error:err
      
    })

  })