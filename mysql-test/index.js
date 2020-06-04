const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog'
})

// 开始连接
con.connect()

// 执行sql语句
const sql = "insert into users (username,`password`,realname) values ('laoba','123','老八');"
con.query(sql,(err,result)=>{
    if(err){
        console.error(err);
        return
    }
    console.log(result);
    
})

// 关闭连接
con.end()