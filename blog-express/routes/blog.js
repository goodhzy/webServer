var express = require("express");
var router = express.Router();

const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

// 获取博客列表
router.get("/list", function (req, res, next) {
  const { method, url } = req;
  const path = url.split("?")[0];

  // TODO 这里判断有问题,当author为0或者false,筛选不到数据的
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel("尚未登录"));
      return;
    }
    author = req.session.username;
  }

  getList(author, keyword).then((result) => {
    res.json(new SuccessModel(result));
  });
});

router.get("/detail", function (req, res, next) {
  const id = req.query.id;
  return getDetail(id).then((rows) => {
    if (rows && rows.length > 0) {
      res.json(new SuccessModel(rows[0]));
    } else {
      res.json(new ErrorModel("找不到该id的博客详情"));
    }
  });
});

router.post("/add",loginCheck, function (req, res, next) {
  req.body.author = req.session.username;
  req.body.title = req.body.title;
  addBlog(req.body).then((result) => {
    res.json(new SuccessModel(result))
  });
});

router.post("/update",loginCheck, function (req, res, next) {
    console.log(`更新id为${req.body.id}的博客数据`);
    updateBlog(req.body).then((result) => {
      if (result) {
        res.json(new SuccessModel("更新成功"))
      } else {
        res.json(new ErrorModel("更新失败"))
      }
    });
});

router.post("/del",loginCheck, function (req, res, next) {
    req.body.author = req.session.username;
    req.body.id = req.query.id
    console.log(req.body);
    
    delBlog(req.body).then((result) => {
      res.json(result ? new SuccessModel("删除成功") : new ErrorModel("删除失败"))
    });
});

module.exports = router;
