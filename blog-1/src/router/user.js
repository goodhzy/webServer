const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require('../db/redis')


// 获取cookie过期时间
const getCookieExpiress = ()=>{
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  // 登录
  if (method === "POST" && path === "/api/user/login") {
    console.log(`登录信息: ${JSON.stringify(req.body)}`);
    return login(req.body).then((data) => {
      
      if(data && data.username){
        
        req.session.username = data.username
        req.session.realname = data.realname

        console.log('-----------------------');
        
        console.log(req.session);
        
         // 同步到 redis
         set(req.sessionId, req.session)
        
        return new SuccessModel("登录成功")
      }
      return new ErrorModel("登录失败")
    });
  }
};

module.exports = handleUserRouter;
