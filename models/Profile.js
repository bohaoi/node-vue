const mongoose = require("mongoose");

//调用数据库Schema方法

const ProfileSchema = mongoose.Schema({
    type: {
        type: String
    },
    descript: {
        type: String
    },
    income: {
        type: String,
        require: true
    },
    expend: {
        type: String,
        require: true
    },
    cash: {
        type: String,
        require: true
    },
    remark: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Profile = mongoose.model("profile",ProfileSchema);