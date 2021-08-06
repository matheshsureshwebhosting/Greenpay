const router = require("express").Router()

const db = require("../database/mysql")
const { checkUserid } = require("../modules/users")

router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM wallethistory'
    const allwallethistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var allwallethistorys = await allwallethistory
    return res.send(allwallethistorys)
})

router.post("/create", async (req, res) => {
    const newwallethistory = req.body
    const myquery = 'INSERT INTO wallethistory SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, newwallethistory, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var wallethistory = await create
    if (wallethistory == true) return res.send(newwallethistory)
    return res.send(wallethistory)

})


router.patch("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "SELECT * FROM wallethistory WHERE userid=? ORDER BY date DESC"
    const wallethistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const wallethistorys = await wallethistory
    return res.send(wallethistorys)
})

router.put("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "UPDATE wallethistory SET ? WHERE userid = ?"
    const updatewallethistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, userid], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const wallethistory = await updatewallethistory
    return res.send(wallethistory)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM wallethistory WHERE id= ?"
    const deletewallethistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const deletewallethistorys = await deletewallethistory
    return res.send(deletewallethistorys)
})

module.exports = router