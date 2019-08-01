/**
 * @name 用户模块路由操作
 * @author 周洋
 * @version 1.0
 * @description 用户登录的路由
 */

const express = require("express"),
    MessageBox = require("../utils/MessageBox"),
    User_infoService = require("../services/User_infoService"),
    Addr_infoService = require("../services/Addr_infoService"),
    path = require("path"),
    fs = require("fs"),
    multer = require("multer");
    PageJson = require("../models/PageJson");

let router = express.Router();

//设置文件上传
let upload = multer({
    dest: path.join(__dirname, "../public/userImgs")
})



//渲染登录页面
router.get("/login", (req, res) => {
    res.render("user_info/login");
});

//渲染注册页面
router.get("/reg", (req, res) => {
    res.render("user_info/reg");
});

//根据用户账号和密码检测登录
router.post("/checkLogin", async (req, res) => {
    let user_infoService = new User_infoService();
    try {
        let result = await user_infoService.checkLogin(req.body);
        
        if (result.length == 1) {
            req.session.userInfo = result[0];
            // console.log(req.session.userInfo)
            MessageBox.showAndRedirect("登录成功", "/main/home", res);
        } else {
            MessageBox.showAndBack("账号或者密码错误", res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误", res);
    }
});


//将用户注册的用户名和密码保存到数据库
router.post("/regSave", async (req, res) => {
    let user_infoService = new User_infoService();
    try {
        let flag = await user_infoService.saveUser(req.body);
        if (flag) {
            MessageBox.showAndRedirect("注册成功", "/user_info/login", res);
        } else {
            MessageBox.showAndBack("数据库连接错误", res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误", res);
    }
});

//渲染用户模块的页面
router.get("/mine", async (req, res) => {
    let userInfo = req.session.userInfo;
    // console.log(userInfo)
    let user_infoService = new User_infoService();
    try {
        let result = await user_infoService.showUserMessage(userInfo);
        
        if (result.length == 1) {
            // res.render("user_info/mine",{model:result[0]});
            res.render("user_info/mine", { userInfo: userInfo, model: result[0] });
        }
    } catch (err) {
        MessageBox.showAndBack(err, res);
    }
});

//渲染用户修改信息的页面
router.get("/userSet", async (req, res) => {
    let user_infoService = new User_infoService();
    try {
        let userInfo = req.session.userInfo;
        let result = await user_infoService.showUserMessage(userInfo);
        if (result.length == 1) {
            res.render("user_info/userSet", { model: result[0] });
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常", res);
    }
});

//保存修改的信息
router.post("/doEdit", upload.single("s_icon"), async (req, res) => {
    let file = req.file;
    let dbPath="";

    //if条件判断上传文件是否为空，
    if(file!=undefined){
        let extName = file.originalname.substr(file.originalname.lastIndexOf("."));   //得到后缀名
        let newPath = file.path + extName;
        fs.renameSync(file.path, newPath);   //重命名
        dbPath = "/public/userImgs/" + file.filename + extName;    //吧图片地址保存到数据库中
    }
    let userInfo = req.session.userInfo;
    let { u_name, u_age, u_sex, u_sign } = req.body;
    let user_infoService = new User_infoService();

    try {
        let flag = await user_infoService.updateUser(userInfo, { u_name, u_age, u_sex, u_sign, u_icon: dbPath });
        if (flag) {
            MessageBox.showAndRedirect("修改成功", "/user_info/userSet", res);
        }
        else {
            MessageBox.showAndBack("修改失败", res);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误", res);
    }
});

//渲染用户收货地址页面
router.get("/userAddr", async (req, res) => {
    if(req.session.userInfo==undefined){
        MessageBox.showAndRedirect("请先登录！","/user_info/login", res);
        
    }else{
        let userInfo = req.session.userInfo.u_id;
        let addr_infoService = new Addr_infoService();
        try {
            let result = await addr_infoService.showAddrList(userInfo);
            let obj = {};
            for (let index in result) {
                obj[index] = result[index];
            }
            if (result.length > 0) {
                res.render("user_info/userAddr", {
                    addrList: obj
                });
            } else if(result.length==0){
                res.render("user_info/userAddr");
            }
        } catch (err) {
            MessageBox.showAndBack("服务器错误", res);
        }
    }
    
});

//渲染添加收货地址页面 
router.get("/addUserAddr", (req, res) => {
    res.render("user_info/addUserAddr");
});

//添加用户收货地址
router.post("/doAddUserAddr", async (req, res) => {
    let addr_infoService = new Addr_infoService();
    let userInfo = req.session.userInfo;
    try {
        let flag = await addr_infoService.addUserAddr(userInfo, req.body);
        if (flag) {
            MessageBox.showAndRedirect("添加成功", "/user_info/userAddr", res);
        } else {
            MessageBox.showAndBack("添加地址出错", res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误", res);
    }
});

//渲染出修改地址的页面
router.get("/editAddr",async (req,res) => {
    let {id} = req.query;
    let addr_infoService = new Addr_infoService();
    try {
        let result = await addr_infoService.editUserAddr(id);
        if(result.length > 0){
            res.render("user_info/editAddr",{addrResult :result[0]});
        }else{
            MessageBox.showAndBack("服务器异常",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误",res);
        console.log(err);
    }
});

//渲染搜索界面
router.get("/searchsp",async(req, res) => {
    // res.render("user_info/search");
    let id = req.query;
//    console.log(id)  
    try {
        if(id==undefined){
            MessageBox.showAndRedirect("没有搜索到相关店铺！","/user_info/search", res);
        }else{
            let sp_infoService = new User_infoService();
            let result = await sp_infoService.searchsp(id);
            if(result.length > 0){
                console.log(result)
                res.render("user_info/searchsp",{shopList : result});
            }else{
                MessageBox.showAndRedirect("没有搜索到相关店铺！","/user_info/search", res);
                // MessageBox.showAndBack("服务器异常",res);
                // console.log(res);
            }
        }
    } catch (err) {
        MessageBox.showAndRedirect("没有搜索到相关店铺！","/user_info/search", res);
        // MessageBox.showAndBack("服务器错误",res);
        console.log(err);
    }
});

router.get("/search", (req, res) => {
    res.render("user_info/search");
});


//执行更改收货地址操作
router.post("/doEditUserAddr", async (req,res) => {
    let addr_infoService = new Addr_infoService();
    try {
        let flag = await addr_infoService.doEditUserAddr(req.body)
        if(flag){
            MessageBox.showAndRedirect("修改成功","/user_info/userAddr",res)
        }else{
            MessageBox.showAndBack("服务器异常",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常",res);
    }
});

//执行删除地址操作
router.get("/deleteUserAddr",async (req,res) => {
    let {id} = req.query;
    let addrId = parseInt(id);
    let addr_infoService = new Addr_infoService();
    try {
        let flag = await addr_infoService.deleteUserAddr(addrId);
        if(flag){
            res.json({status:"success",msg:"删除成功"});
        }else{
            res.json({status:"error",msg:"删除失败"});
        }
    } catch (err) {
        res.json({status:"error",msg:"服务器错误"});
    }
}); 

//执行退出操作
router.get("/userExit",(req,res) => {
    let {flag} = req.query;
    if(flag == "0"){
        req.session.userInfo = undefined;
        res.json({status : "success", msg : "退出成功"});
    }else{
        res.json({status : "error",msg : "退出失败"});
    }
});



module.exports = router;