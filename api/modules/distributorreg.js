const db = require("../database/mysql")

module.exports.checkUser = async (email) => {
    const myquery = "SELECT * FROM distributorreg WHERE email=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [email], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return user
}

module.exports.checkUserid = async (userid) => {    
    const myquery = "SELECT * FROM distributorreg WHERE userid=?"
    const singleUser = new Promise(async (resolve, reject) => {
        await db.query(myquery, [userid], (err, res) => {
            if (err) return resolve(err)
            return resolve(res)
        })
    })
    const user = await singleUser
    return user
}