//数据库存储模型
const mongoose = require("mongoose");
//实例化数据库Schema
// const Schema = mongoose.Schema();

//创建Schema 
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("users", UserSchema);