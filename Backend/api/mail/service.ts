import dotenv from "dotenv";
import { IMailOrder } from "./types"
import {createTransport} from "nodemailer"

class MailService{
    transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })

    async sendMail(mailOrder: IMailOrder[], addressee: string){
        try{
            let mailOrderToHTML = ""
            mailOrder.forEach(order =>{
                mailOrderToHTML += 
                `<tr style="text-align: left;">
                    <td style="max-width: 500px;">${order.title}</td>
                    </td>${order.unit_price}<td/>
                </tr>`
            })
            const mailContent = `<main style="padding: 2px; font-family: sans-serif; background-color: rgb(240, 240, 240); border-radius: 5px;">
            <h1>Gracias por tu compra!!!</h1>
            <p>Tu compra fue recibida y ya se encuentra en camino</p>
            <p>Resúmen de la compra:</p>
            <div style="max-width: 50%; padding: 2px;">
                <table style="width: 100%; margin-bottom: 10px;">
                    <thead style="margin: auto;">
                        <tr style="text-align: left;">
                            <th>Producto</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mailOrderToHTML}
                    </tbody>
                </table>
                <a href="${process.env.FRONT_END_URL}" style="width: fit-content; padding: 5px; border-radius: 5px; font-weight: 600; background-color: black; color: whitesmoke; text-decoration: none;">Seguir comprando</a>
            </div>
        </main>`
            const mail = {
                from: "",
                to: addressee,
                subject: "Compra realizada con éxito",
                html: mailContent,
            }
            this.transport.sendMail(mail)
        }catch(error){
            console.log(error)
        }
    }
}

const mailService = new MailService()
export default mailService