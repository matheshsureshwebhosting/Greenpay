const router = require("express").Router()

const db = require("../database/mysql")

const {checkUser}=require("../modules/usersreg")


router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM distributorreg'
    const distributorreg = new Promise(async (resolve, reject) => {      
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var alldistributorreg = await distributorreg
    return res.send(alldistributorreg)
})

router.post("/create", async (req, res) => {
    const { email } = req.body
    const checkuser = await checkUser(email)    
    if (checkuser.length !=0) return res.status(400).send("Already Registerd")
    var user = req.body
    const myquery = 'INSERT INTO distributorreg SET ?'
    const createdistributorreg = new Promise(async (resolve, reject) => {
        await db.query(myquery, user, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var newcreatedistributorreg = await createdistributorreg
    if (newcreatedistributorreg == true) return res.send(user)
    return res.send(newcreatedistributorreg)

})


router.patch("/:email", async (req, res) => {
    const { email } = req.params
    const myquery = "SELECT * FROM distributorreg WHERE email=?"
    const singlecreatedistributorreg = new Promise(async (resolve, reject) => {
        await db.query(myquery, [email], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const createdistributorreg = await singlecreatedistributorreg
    return res.send(createdistributorreg)
})

router.put("/:email", async (req, res) => {
    const { email } = req.params
    const myquery = "UPDATE distributorreg SET ? WHERE email = ?"
    const updatecreatedistributorreg = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, email], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updatecreatedistributorreg
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM distributorreg WHERE id= ?"
    const deldistributorreg = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const deldistributorregs = await deldistributorreg
    return res.send(deldistributorregs)
})

module.exports = router