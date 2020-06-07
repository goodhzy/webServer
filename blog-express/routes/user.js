var express = require('express');
var router = express.Router();
var {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel");


/* GET users listing. */
router.post('/login', function(req, res, next) {
    login(req.body).then((data) => {
      
      if(data && data.username){
        
        req.session.username = data.username
        req.session.realname = data.realname
         
        res.json(new SuccessModel("登录成功"))
      }
      res.json(new ErrorModel("登录失败"))
    });
});

router.get('/login-test',(req, res, next)=>{
  if (!req.session.username) {
    res.json(new ErrorModel("尚未登录"))
  }else{
    res.json(new SuccessModel(req.session))
  }
})

module.exports = router;
