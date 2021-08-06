const router = require("express").Router()

const db = require("../database/mysql")

const { checkUserid } = require("../modules/users")



router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM tickets'
    const support = new Promise(async (resolve, reject) => {
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var allsupport = await support
    return res.send(allsupport)
})

router.post("/create", async (req, res) => {
    const { userid } = req.body
    const checkuser = await checkUserid(userid)
    if (checkuser.length == 0) return res.status(400).send("In-valid User")
    var support = req.body
    const myquery = 'INSERT INTO tickets SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, support, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var newsupport = await create
    if (newsupport == true) return res.send(support)
    return res.send(newsupport)

})


router.get("/:userid", async (req, res) => {
    const { userid } = req.params    
    const myquery = "SELECT * FROM tickets WHERE userid=? ORDER BY date DESC"
    const singleticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const tickets = await singleticket
    return res.send(tickets)
})

router.patch("/:ticketid", async (req, res) => {
    const { ticketid } = req.params
    const myquery = "SELECT * FROM tickets WHERE ticketid=?"
    const singleticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, [ticketid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const tickets = await singleticket
    return res.send(tickets)
})
router.put("/:ticketid", async (req, res) => {
    const { ticketid } = req.params
    const myquery = "UPDATE tickets SET ? WHERE ticketid = ?"
    const updateticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, ticketid], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateticket
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM tickets WHERE id= ?"
    const deleteticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const deletetickets = await deleteticket
    return res.send(deletetickets)
})

module.exports = router