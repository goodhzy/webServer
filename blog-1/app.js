const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve("");
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve("");
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve("");
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader("Content-type", "application/json");

  // 获取query数据
  req.query = querystring.parse(req.url.split("?")[1]);
    
  // 处理 post data数据
  getPostData(req).then((postData) => {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData =>{
            res.end(JSON.stringify(blogData))
        })
        return;
      }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData=>{
            res.end(JSON.stringify(userData));
        })
        return;
      }

      // 未命中路由,返回404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 NOT FOUND\n");
      res.end();
  });
};

module.exports = serverHandle;
