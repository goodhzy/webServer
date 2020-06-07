var express = require("express");
var path = require("path");
var fs = require("fs")
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require('cors')
let RedisStore = require('connect-redis')(session)
let redisClient = require('./db/redis')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
var userRouter = require("./routes/user");

var app = express();
app.use(cors({
    origin: 'http://localhost:8001',
    credentials:true
}))

const ENV = process.env.NODE_ENV
if(ENV !== 'production'){
    app.use(logger('dev'))
}else{
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName,{
        flags: 'a'
    })
    app.use(logger('combined',{
        stream: writeStream
    }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "HsiHla.232_fd#",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

module.exports = app;
