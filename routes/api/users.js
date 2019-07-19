//login & regist 
const express = require("express")
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");




//设置路由
//$router GET /api/users/test
router.get("/test", (req, res) => {
    res.json({ msg: "login works" })
})


//注册接口
//$router POST /api/users/register
router.post("/register", (req, res) => {
    // console.log(req.body);

    //查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({email:"邮箱已被注册"})
            } else {
                //调用gravatar方法
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    });
                });
            }
        })
})



//登录接口
//$router POST /api/users/login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //数据库中查询
    User.findOne({ email })
        .then(user => {
            //判读是否有该用户
            if (!user) {
                return res.status(404).json("邮箱不存在");
            } else {
                //用户存在判断密码
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const rule = {
                                id: user.id,
                                name: user.name,
                                identity: user.identity
                            }
                            //使用token
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                            // res.json({ msg: "success" })
                        } else {
                            return res.status(400).json("密码错误")
                        }
                    })
            }
        })
})


//$router GET api/users/current
//@access Private

// router.get("/current","token",(req,res))
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json(
        {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        }
    );
})


module.exports = router;