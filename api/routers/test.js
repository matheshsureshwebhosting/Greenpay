const router = require("express").Router()
const db = require("../database/mysql")


router.get("/", async (req, res) => {
    const myquery = 'SELECT * FROM other_certificates'
    const getdata = new Promise(async (resolve, reject) => {
        await db.query(myquery, (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    var allusers = await getdata    
    return res.send(allusers)
})
var names="kalidas"

var d1 = {
    name: '["kalidas","qqq"]',
    email: `'[{"name":"${names}","info":["hai","${names}"]}]'`,
    location: "location",
    password: "password",
    phone: "phone",
    wallet: 0,
    userid: "userid",
}

router.post("/create", async (req, res) => {

    const myquery = 'INSERT INTO users SET ?'
    const create = new Promise(async (resolve, reject) => {
        await db.query(myquery, d1, (err, res) => {
            if (err) return resolve(err)
            return resolve(true)
        })
    })
    var allusers = await create
    return res.send(allusers)
})

module.exports = router

