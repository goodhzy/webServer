const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const xss  = require('xss')

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  // 统一登录验证
  const loginCheck = (req) => {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
  };

  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    // TODO 这里判断有问题,当author为0或者false,筛选不到数据的
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";

    if (req.query.isadmin) {
      let loginCheckResult = loginCheck(req)
      if(loginCheckResult){
          return loginCheckResult
      }
      author = req.session.username;
    }

    return getList(author, keyword).then((result) => {
      return new SuccessModel(result);
    });
  }

  // 获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
    const id = req.query.id;
    return getDetail(id).then((rows) => {
      if (rows && rows.length > 0) {
        return new SuccessModel(rows[0]);
      } else {
        return new ErrorModel("找不到该id的博客详情");
      }
    });
  }

  // 新建博客
  if (method === "POST" && path === "/api/blog/add") {
    let loginCheckResult = loginCheck(req)
      if(loginCheckResult){
          return loginCheckResult
      };
    console.log(`新建博客, 博客数据为${JSON.stringify(req.body)}`);
    req.body.author = req.session.username;
    // 防止xss攻击,原理就是给一些字符作转义
    req.body.title = xss(req.body.title)
    return addBlog(req.body).then((result) => {
      return new SuccessModel(result);
    });
  }

  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
    let loginCheckResult = loginCheck(req)
      if(loginCheckResult){
          return loginCheckResult
      };
    console.log(`更新id为${req.body.id}的博客数据`);
    return updateBlog(req.body).then((result) => {
      if (result) {
        return new SuccessModel("更新成功");
      } else {
        return new ErrorModel("更新失败");
      }
    });
  }

  // 删除博客
  if (method === "POST" && path === "/api/blog/del") {
    let loginCheckResult = loginCheck(req)
      if(loginCheckResult){
          return loginCheckResult
      };
    console.log(`删除id为${req.body.id}的博客数据`);
    req.body.author = req.session.username;
    return delBlog(req.body).then((result) => {
      return result ? new SuccessModel("删除成功") : new ErrorModel("删除失败");
    });
  }
};

module.exports = handleBlogRouter;
