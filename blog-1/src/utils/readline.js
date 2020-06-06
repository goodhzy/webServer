const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../','../','logs','access.log')

// 创建read stream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})


let chromeNum = 0
let sum = 0
// 逐行读取
rl.on('line',(lineData)=>{
    console.log(lineData);
    
    if(!lineData)return

    // 记录总行数
    sum++
    if(lineData.includes('Chrome')){
        chromeNum++
    }
})

rl.on('close',()=>{
    console.log(chromeNum/sum);
})
