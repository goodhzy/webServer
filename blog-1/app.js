const serverHandle = ((req, res)=>{
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')
    try {
        const resData = {
        name: 'hzy',
        site: 'imooc',
        evn: process.env.NODE_ENV
    }
    res.end(JSON.stringify(resData))
    } catch (error) {
        console.log('报错了');
    }
    
})

module.exports = serverHandle