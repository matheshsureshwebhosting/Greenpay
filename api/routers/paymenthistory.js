const router = require("express").Router()


const { checkUserid } = require("../modules/users")
const db = require("../database/mysql")

router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM paymenthistory'
    const paymenthistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var paymenthistorys = await paymenthistory
    return res.send(paymenthistorys)
})

router.post("/create", async (req, res) => {        
    const newpaymenthistory=req.body   
    const myquery = 'INSERT INTO paymenthistory SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, newpaymenthistory, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var paymenthistory = await create    
    if (paymenthistory == true) return res.send(newpaymenthistory)
    return res.send(paymenthistory)
})


router.get("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "SELECT * FROM paymenthistory WHERE userid=? ORDER BY date DESC"
    const singlepaymenthistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const singlepaymenthistorys = await singlepaymenthistory
    return res.send(singlepaymenthistorys)
})


router.put("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "UPDATE paymenthistory SET ? WHERE userid = ?"
    const updatepaymenthistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, userid], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updatepaymenthistory
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM paymenthistory WHERE id= ?"
    const deletepaymenthistory = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const deletepaymenthistorys = await deletepaymenthistory
    return res.send(deletepaymenthistorys)
})

module.exports = router