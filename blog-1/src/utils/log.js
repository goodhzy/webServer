const fs = require("fs");
const path = require("path");

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n");
};

// 生成 write stream
const createWriteSteam = (filename) => {
  const fullFileName = path.join(__dirname, "../", "../", "logs",filename);
  
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a",
  });
  return writeStream;
};

// 写入访问日志
const accessWriteStream = createWriteSteam("access.log");
const access = (log) => {
  writeLog(accessWriteStream, log);
};

module.exports = {
  access,
};
