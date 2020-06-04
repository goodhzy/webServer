const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req, res)=>{
    const {method, url} = req
    const path = url.split('?')[0]

    // 登录
    if(method === 'POST' && path === '/api/user/login'){
        const result = loginCheck(req.body)
        console.log(`登录信息: ${JSON.stringify(req.body)}`);
        
        if(result){
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('登录失败')
        }
    }
}

module.exports = handleUserRouter