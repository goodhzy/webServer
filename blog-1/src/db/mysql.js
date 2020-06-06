const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

// 创建连接对象
 const con = mysql.createConnection(MYSQL_CONF)

//  开始连接
con.connect((err)=>{
    if(err){
        console.error('mysql连接失败: ' + err);
    }
})

// 统一执行sql的函数
function exec(sql){
    console.log(sql);
    
    return new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            console.log(result);
            
            if(err){
                reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}