import { Router } from "express"
const router = Router()
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


router.post("/mailer", async (req, res) => {
    const { email } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
            // user: 'everardo.graham79@ethereal.email',
            // pass: 'z2uTPVw5hCesvTYTSY'
        }
    });

    const msg = {
        from: '"LEGO PEOPLE SHOP" <shop@legopeople.com>', // sender address
        to: email, // list of receivers
        subject: "Welcome", // Subject line
        text: "Welcome to Lego people shop!", // plain text body
        html: "<h1>😀</h1>", // html body
    }

    try {

        let info = await transporter.sendMail(msg);

        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).send({ message: "email was sent" })
    } catch (e) {
        console.error(e)
    }
})

export default router