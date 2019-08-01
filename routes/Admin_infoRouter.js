/**
 * @name 管理员路由
 * @author 周洋
 * @version 1.0.0
 * @description 管理员操作模块
 */

let router=require("express").Router();

const menuConfig=require("../config/menuConfig"),
      Admin_infoService = require("../services/Admin_infoService"),
      MessageBox = require("../utils/MessageBox"),
      path = require("path"),
      fs = require("fs"),
      multer = require("multer");

//管理员登陆
router.get("/login",(req,res)=>{
    //渲染一个登陆页
    res.render("admin_info/login");
});

//检测用户名与密码
router.post("/checkLogin",async (req,res) => {
    let admin_infoService = new Admin_infoService();
    try {
        let result = await admin_infoService.checkLogin(req.body);
        if(result.length == 1){
            req.session.adminInfo = result[0]; 
            // console.log(req.session.adminInfo);
            MessageBox.showAndRedirect("登录成功","adminIndex",res)
        }else{
            MessageBox.showAndBack("账号或密码错误",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常",res);
        console.log(err);
    }
});

//显示后台管理的欢迎页面
router.get("/welcome",(req,res) => {
    let adminInfo = req.session.adminInfo;
    res.render("admin_info/welcome",{adminInfo:adminInfo});
});

//显示后台主页面
router.get("/adminIndex",(req,res)=>{
    let adminInfo = req.session.adminInfo;
    // console.log(adminInfo);
    res.render("admin_info/adminIndex",{adminInfo:adminInfo,menuConfig});
});

// 新增商铺页面
router.get("/addstore",(req,res)=>{
    let adminInfo = req.session.adminInfo;
    res.render("admin_info/addstore",{adminInfo:adminInfo});
});
// 添加商铺
//设置文件上传
let upload = multer({
    dest: path.join(__dirname, "../public/storeimg")
})
router.post("/addstorecz",upload.single("s_icon"),async (req,res) => {
    let file = req.file;
    let dbPath="";
    //if条件判断上传文件是否为空，
    if(file!=undefined){
        let extName = file.originalname.substr(file.originalname.lastIndexOf("."));   //得到后缀名
        let newPath = file.path + extName;
        fs.renameSync(file.path, newPath);   //重命名
        dbPath = "/public/storeimg/" + file.filename + extName;    //把图片地址保存到数据库中
    }
    // console.log(req.body)
    let { s_name,s_shortPrice,s_sendPrice,s_special} = req.body;
    let admin_infoService = new Admin_infoService();
    try {
        let adminInfo = req.session.adminInfo.a_id;
        console.log(adminInfo)
        let flag = await admin_infoService.addstores({ s_name,s_shortPrice,s_sendPrice,s_special,adminInfo, s_icon: dbPath });
        if (flag) {
            MessageBox.showAndRedirect("添加成功", "/admin_info/welcome", res);
        }
        else {
            MessageBox.showAndBack("添加失败", res);
        }
    } catch (error) {
        MessageBox.showAndBack("服务器错误", res);
    }
});

// 删除店铺页面
router.get("/delshop",async (req,res)=>{
    let admin_infoService = new Admin_infoService();
    let adminInfo = req.session.adminInfo.a_id;
    try {
        let result = await admin_infoService.showshop(adminInfo);
        // console.log(result)
        if (result.length >= 0) {
            res.render("admin_info/delshop",{model:result});
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常", res);
    }
});

// 删除店铺操作
router.get("/dodelshop",async (req,res) => {
    let admin_infoService = new Admin_infoService();
    let adminInfo = req.session.adminInfo.a_id;
    let {id} = req.query;
    try {
        let flag = await admin_infoService.dodelshop(id,adminInfo);
        if(flag){
            res.json({status:"success",msg:"删除成功"});
        }else{
            res.json({status:"error",msg:"删除失败"});
        }
    } catch (err) {
        res.json({status:"error",msg:"服务器错误"});
    }
}); 








// 修改密码页面
router.get("/changepassw",(req,res)=>{
    let adminInfo = req.session.adminInfo;
    res.render("admin_info/changepassw",{adminInfo:adminInfo});
});
// 更改密码
router.post("/changepassword",async (req,res) => {
    let admin_infoService = new Admin_infoService();
    try {
        let result = await admin_infoService.doEditpassw(req.body);

        if(result == 1){
            // req.session.adminInfo = result[0];   
            MessageBox.showAndRedirect("更改成功","/admin_info/welcome",res)
        }else{
            MessageBox.showAndBack("账号或密码错误",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常",res);
        console.log(err);
    }
});

// 添加管理员页面
router.get("/addadmin",(req,res)=>{
    //渲染页面
    res.render("admin_info/addadmin");
});
// 添加管理员操作
router.post("/addadmincz",async (req,res) => {
    let admin_infoService = new Admin_infoService();
    try {
        let result = await admin_infoService.addadmin(req.body);
        if(result == 1){
            // req.session.adminInfo = result[0];   
            MessageBox.showAndRedirect("添加成功","/admin_info/welcome",res)
        }else{
            MessageBox.showAndBack("账号或密码错误",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器异常",res);
        console.log(err);
    }
});






//执行退出系统操作
router.get("/adminExit",(req,res) => {
    let {flag} = req.query;
    if(flag == "0"){
        req.session.userInfo = undefined;
        res.json({status : "success", msg : "退出成功"});
    }else{
        res.json({status : "error",msg : "退出失败"});
    }
});

module.exports=router;