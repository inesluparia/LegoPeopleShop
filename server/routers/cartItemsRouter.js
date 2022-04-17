import { Router } from "express"
const router = Router()
import { db } from "../database/createConnection.js"


//get cart items from user id
router.get("/api/:userid/cartitems", async (req, res) => {
    const id = req.params.userid
    if (req.session.userId === parseInt(id)) {
        const userCartItems = await db.all(
            "SELECT * FROM items INNER JOIN cartitems ON cartitems.item_id = items.id WHERE cartitems.user_id = " + id + ";"
        )
        res.send({ data: userCartItems })
    } else {
        res.status(404).send({ message: "Not authorized!" })
    }
})

//update user cart changes in db
router.post("/api/:userid/cartitems", async (req, res) => {
    const id = req.params.userid
    if (req.session.userId === parseInt(id)) {
        const { itemId } = req.body
        const changes = await db.run(`INSERT INTO cartitems (user_id, item_id) VALUES (${id}, ? );`, [itemId])
        res.status(201).send({ cartItemId: changes.lastID })
    } else {
        res.status(404).send({ message: "Not authorized!" })
    }
})

router.delete("/api/:userid/cartitems/:id", async (req, res) => {
    const id = req.params.userid
    if (req.session.userId === parseInt(id)) {
        const response = await db.run('DELETE FROM cartitems WHERE id = ?;', [req.params.id])
        res.status(200).send({ response })
    } else {
        res.status(404).send({ message: "Not authorized!" })
    }
})

export default router