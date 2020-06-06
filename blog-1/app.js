const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { get, set } = require("./src/db/redis");
const { access } = require("./src/utils/log");

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

// 获取cookie过期时间
const getCookieExpiress = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const serverHandle = (req, res) => {
  // 日志
  // access(
  //   `${req.method} -- ${req.url} -- ${
  //     req.headers["user-agent"]
  //   } -- ${new Date()}`
  // );
  // 设置返回格式
  res.setHeader("Content-type", "application/json");

  // 设置cors
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8001");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // 允许服务器端发送Cookie数据

  if (req.method === "OPTIONS") {
    console.log('options');
    
    res.writeHead(200);
    res.end();
    return;
  }

  // 获取query数据
  req.query = querystring.parse(req.url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) return;
    // cookie分号后面带空格
    const arr = item.trim().split("=");
    const [key, value] = arr;
    req.cookie[key] = value;
  });

  // 解析 session （使用 redis）
  let needSetCookie = false;
  let userId = req.cookie.userId;

  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  }
  // 获取 session
  req.sessionId = userId;

  get(req.sessionId)
    .then((sessionData) => {
      console.log(sessionData);

      if (sessionData == null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        // 设置 session
        req.session = sessionData;
      }
      // console.log('req.session ', req.session)

      // 处理 post data
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userId=${userId};path=/;HttpOnly;Secure;SameSite=None;expires=${getCookieExpiress()}`
          );
        }
        blogResult.then((blogData) => {
          res.end(JSON.stringify(blogData));
        });
        return;
      }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userId=${userId};path=/;HttpOnly;Secure;SameSite=None;expires=${getCookieExpiress()}`
          );
        }
        userResult.then((userData) => {
          res.end(JSON.stringify(userData));
        });
        return;
      }
      // 未命中路由,返回404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 NOT FOUND\n");
      res.end();
    });
};

module.exports = serverHandle;
