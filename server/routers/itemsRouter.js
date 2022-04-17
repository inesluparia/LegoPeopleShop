import { Router } from "express"
const router = Router()
import { db } from "../database/createConnection.js"

router.get("/api/items", async (req, res) => {
    const items = await db.all("SELECT * FROM items;")
    res.send({ data: items})
})

export default router
