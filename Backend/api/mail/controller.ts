import { Request, Response } from "express"
import mailService from "./service"
import { IMailOrder } from "./types"

class MailController{
    async sendMail(req: Request, res: Response){
        try{
            console.log(req.body)
            const mailOrder : IMailOrder[] = req.body.items
            mailService.sendMail(mailOrder, req.body.mail) 
            return res.status(200).json()           
        }catch(error){
            console.log(error)
        }
    }
}

const mailController = new MailController()
export default mailController