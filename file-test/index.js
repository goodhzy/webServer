const fs = require('fs')
const path = require('path')

// 读取文件内容
const fileName = path.resolve(__dirname, 'data.js')

// fs.readFile(fileName, (err,data)=>{
//     if(err){
//         console.log('读取文件错误: ' + err);
//         return
//     }
//     console.log('文件内容: \n' + data.toString());  
// })

// 写入文件内容
let content = '这是新加的内容\n'
const opt = {
    flag: 'w', // 写入方式,a为追加, w为覆盖
}
fs.writeFile(fileName,content,opt,(err)=>{
    if(err){
        console.log('写入文件失败: ' + err);
    }
})

// 判断文件是否存在
fs.exists(fileName, (exists)=>{
    console.log('exists: ' + exists);
})