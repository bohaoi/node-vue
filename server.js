//引入
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const app = express();
//引入路由
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles")

//引入数据库
const db = require("./config/keys").mongoURI;

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//连接数据库
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//初始化passport
app.use(passport.initialize());
//配置passport
require("./config/passport")(passport);

//实例化
//使用路由users
app.use("/api/users", users);
app.use("/api/profiles", profiles);

//设置端口
const port = process.env.PORT || 5000

//监听
app.listen(port, () => {
    console.log("Server runing on port")
})