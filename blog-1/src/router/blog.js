const {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    // TODO 这里判断有问题,当author为0或者false,筛选不到数据的
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
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
    console.log(`新建博客, 博客数据为${JSON.stringify(req.body)}`);
    return addBlog(req.body).then((result) => {
      return new SuccessModel(result);
    });
  }

  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
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
    console.log(`删除id为${req.body.id}的博客数据`);
    return delBlog(req.body.id).then((result) => {
      return result ? new SuccessModel("删除成功") : new ErrorModel("删除失败");
    });
  }
};

module.exports = handleBlogRouter;
