const router = require("express").Router()
const Hash = require("../helpers/bcrypt")

const db = require("../database/mysql")

const { checkUser } = require("../modules/admin")

router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM admins'
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
    const { email,password } = req.body
    const checkuser = await checkUser(email)
    if (checkuser.length != 0) return res.status(400).send("Already Registerd")
    var user = req.body
    var hashPwd = await Hash.createrHashpwd(password)
    user["password"] = hashPwd
    const myquery = 'INSERT INTO admins SET ?'
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

router.get("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "SELECT * FROM admins WHERE userid=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})
router.patch("/:email", async (req, res) => {
    const { email } = req.params
    const myquery = "SELECT * FROM admins WHERE email=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [email], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return res.send(user)
})

router.put("/:userid", async (req, res) => {
    const { userid } = req.params
    const myquery = "UPDATE admins SET ? WHERE userid = ?"
    const updateUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [req.body, userid], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateUser
    return res.send(update)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const myquery = "DELETE FROM admins WHERE id= ?"
    const updateUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [id], (err, res) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
    const update = await updateUser
    return res.send(update)
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const checkuser = await checkUser(email)
    if (checkuser.length == 0) return res.status(401).send("You Are Not Register")
    const checkpwd = await Hash.verifyPwd(password, checkuser[0].password)
    if (checkpwd == true) return res.send(checkuser)
    return res.status(401).send("In-valid email/password")
})


module.exports = router