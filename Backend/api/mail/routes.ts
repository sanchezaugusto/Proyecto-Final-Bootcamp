import express from "express";
import mailController from "./controller"; 

const mailRouter = express.Router();
const {sendMail} = mailController

mailRouter.post("/sendMail", sendMail);


export default mailRouter;
