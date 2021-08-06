const router = require("express").Router()

const db = require("../database/mysql")

const {checkUser}=require("../modules/usersreg")



router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM userreg'
    const users = new Promise(async (resolve, reject) => {      
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })

    })
    var allusers = await users
    return res.send(allusers)
})

router.post("/create", async (req, res) => {
    const { email } = req.body
    const checkuser = await checkUser(email)    
    if (checkuser.length !=0) return res.status(400).send("Already Registerd")
    var user = req.body
    const myquery = 'INSERT INTO userreg SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, user, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var allusers = await create
    if (allusers == true) return res.send(user)
    return res.send(allusers)

})


router.patch("/:email", async (req, res) => {
    const { email } = req.params
    const myquery = "SELECT * FROM userreg WHERE email=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [email], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})

router.put("/:email", async (req, res) => {
    const { email } = req.params
    const myquery = "UPDATE userreg SET ? WHERE email = ?"
    const updateUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, email], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateUser
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM userreg WHERE id= ?"
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