const router = require("express").Router()

const db = require("../database/mysql")

const { checkUserid } = require("../modules/admin")



router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM marquee'
    const marquee = new Promise(async (resolve, reject) => {
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var allmarquee = await marquee
    return res.send(allmarquee)
})

router.post("/create", async (req, res) => {
    const { userid } = req.body
    const checkuser = await checkUserid(userid)
    if (checkuser.length == 0) return res.status(400).send("In-valid User")
    var marquee = req.body
    const myquery = 'INSERT INTO marquee SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, marquee, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var newmarquee = await create
    if (newmarquee == true) return res.send(marquee)
    return res.send(newmarquee)

})


router.get("/:userid", async (req, res) => {
    const { userid } = req.params    
    const myquery = "SELECT * FROM marquee WHERE userid=?"
    const singlemarquee = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const marquees = await singlemarquee
    return res.send(marquees)
})

router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "SELECT * FROM marquee WHERE id=?"
    const singlemarquee = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const marquee = await singlemarquee
    return res.send(marquee)
})
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "UPDATE marquee SET ? WHERE id = ?"
    const updateticket = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateticket
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM marquee WHERE id= ?"
    const deletemarquee = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const deletemarquees = await deletemarquee
    return res.send(deletemarquees)
})

module.exports = router