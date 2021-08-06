const router = require("express").Router()


const db = require("../database/mysql")



router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM all_certificates ORDER BY date DESC'
    const users = new Promise(async (resolve, reject) => {      
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var allusers = await users
    return res.send(allusers)
})

router.get("/:certificateid", async (req, res) => {
    const { certificateid } = req.params
    const myquery = "SELECT * FROM all_certificates WHERE certificateid=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [certificateid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})
router.patch("/status", async (req, res) => {
    const { status } = req.body
    const myquery = "SELECT * FROM all_certificates WHERE iscomplete=? ORDER BY date DESC"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [status], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})
router.get("/single/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "SELECT * FROM all_certificates WHERE userid=? ORDER BY date DESC"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})

router.put("/:certificateid", async (req, res) => {
    const { certificateid } = req.params
    const myquery = "UPDATE all_certificates SET ? WHERE certificateid = ?"
    const updateUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, certificateid], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateUser
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM all_certificates WHERE id= ?"
    const updateUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateUser
    return res.send(update)
})

module.exports = router