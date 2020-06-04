const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  // 登录
  if (method === "POST" && path === "/api/user/login") {
    console.log(`登录信息: ${JSON.stringify(req.body)}`);
    return loginCheck(req.body).then((result) => {
      return result ? new SuccessModel("登录成功") : new ErrorModel("登录失败");
    });
  }
};

module.exports = handleUserRouter;
