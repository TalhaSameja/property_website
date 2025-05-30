import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port : 465,
    auth:{
        user:  'iammani258@gmail.com',
        pass: 'lztnaabamouixqld'

    }
})


export const sendEmail = async ({to, subject, html})=>{
    try {
        console.log("in sendmail")
        const info = await transporter.sendMail({
           
            to,
            subject,
            html
        })
        console.log(info.messageId + "email is send")
        return true;
    } catch (error) {
        
        console.log(error+ "something went worong while sending email")
        return false;
    }
}