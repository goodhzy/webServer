const {exec} = require('../db/mysql')

const loginCheck = ({username, password})=>{
    let sql = `select * from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows=>{
        return rows.length > 0
    })
}

module.exports = {
    loginCheck
}