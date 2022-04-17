import { db } from "../database/createConnection.js"
import { Router } from "express"
const router = Router()

import bcrypt from "bcrypt";

router.post("/auth/signup", async (req, res) => {
    const { regName, regEmail, regPassword } = await req.body
    try {
        const emailExistsResponse = await db.all(`SELECT id FROM users WHERE email = ?;`, [regEmail])
        if (emailExistsResponse.length) {
            res.status(409).send({ message: "That email already exists." })
        }
        const hashedPassword = await bcrypt.hash(regPassword, 12)
        const dbResponse = await db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, "${hashedPassword}");`, [regName, regEmail])
        req.session.userId = dbResponse.lastID
        req.session.email = regEmail
        res.status(201).send({ name: regName, userId: dbResponse.lastID });
    } catch (e) {
        console.error(e)
    }
})

router.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const dbResponse = await db.all(`SELECT password, name, id FROM users WHERE email = ?;`, [email])
        if (dbResponse.length) {
            const isSame = await bcrypt.compare(password, dbResponse[0].password);
            if (isSame) {
                req.session.userId = dbResponse[0].id
                req.session.email = email
                res.status(200).send({ name: dbResponse[0].name, userId: dbResponse[0].id });
            }
            else {
                res.status(400).send({ message: "Incorrect password." });
            }
        }
        else {
            res.status(404).send({ message: "Email was not found." })
        }
    } catch (e) {
        console.error(e)
    }
})

export default router