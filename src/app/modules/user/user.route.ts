import express from 'express';


const router= express.Router();

router.post('/create-user',userController.createUser)



export const UseRoutes=router