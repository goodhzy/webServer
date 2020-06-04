const { getList, getDetail,addBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    // TODO 这里判断有问题,当author为0或者false,筛选不到数据的
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
      const id = req.query.id
      const data = getDetail(id)
      return new SuccessModel(data)
  }

  // 新建博客
  if (method === "POST" && path === "/api/blog/add") {
      const data = addBlog(req.body)
      console.log(`新建博客, 博客数据为${JSON.stringify(req.body)}`);
      
      return new SuccessModel(data)
  }

  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
    const data = updateBlog(req.body)
    console.log(`更新id为${req.body.id}的博客数据`);
    
    if(data){
      return new SuccessModel('更新成功')
    }else{
      return new ErrorModel('更新失败')
    }

  }

  // 删除博客
  if (method === "POST" && path === "/api/blog/del") {
    const data = delBlog(req.body.id)
    console.log(`删除id为${req.body.id}的博客数据`);
    
    if(data){
      return new SuccessModel('删除成功')
    }else{
      return new ErrorModel('删除失败')
    }
  }
};

module.exports = handleBlogRouter;
