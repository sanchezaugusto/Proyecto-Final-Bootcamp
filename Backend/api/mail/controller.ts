import { Request, Response } from "express"
import mailService from "./service"
import { IMailOrder } from "./types"

class MailController{
    async sendMail(req: Request, res: Response){
        try{
            const mailOrder : IMailOrder[] = req.body
            mailService.sendMail(mailOrder, req.params.email) 
            return res.status(200).json()           
        }catch(error){
            console.log(error)
        }
    }
}

const mailController = new MailController()
export default mailController