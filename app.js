/**
 * @name 程序入口文件
 * @author 周洋
 * @version 1.0.0
 * @requires 
 * @description 实现const的批量定义方式
 */
const express = require("express"),
      http = require("http"),
      template = require("express-art-template"),
      path = require("path"),
      bodyParser = require("body-parser"),
      session = require("express-session");

//导入路由文件
const MainRouter = require("./routes/MainRouter"),
      Order_infoRouter = require("./routes/Order_infoRouter"),
      User_infoRouter = require("./routes/User_infoRouter");
      Admin_infoRouter = require("./routes/Admin_infoRouter");


let app = express();
app.engine("html",template);//设置视图后缀名
app.set("views",path.join(__dirname,"./views")); //设置视图文件所在的位置
app.set("view engine","html");//返回视图文件不需要再加后缀名
let server = http.createServer(app);//创建服务器

//设置静态路径，__dirname表示当前路径
app.use("/public",express.static(path.join(__dirname,"./public")));


//加载post取值插件 bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//设置session
app.use(session({
  secret:"aaaaaabbbbbbb",
  resave:true,        //是否可以更改里面的值
  saveUninitialized:false
}));

//加载路由
app.use("/main",MainRouter);
app.use("/order_info",Order_infoRouter);
app.use("/user_info",User_infoRouter);
app.use("/admin_info",Admin_infoRouter);

//放行
let pathArr=[
  "/user_info/login",
  "/user_info/reg",
  "/main/home",
  "/user_info/checkLogin",
  "/user_info/regSave",
  "/user_info/mine",
  "/order_info/order",
  "/order_info/saveOrder",
  "/order_info/shopMenu",
  "/user_info/search",
  "/user_info/searchsp",
  "/admin_info/login",
  ];
  
  app.use((req,resp,next)=>{
      let path=req.path;
      if(pathArr.includes(path)){
          next();
      }
      else{
          if(req.session.userInfo==undefined){
              resp.redirect("/main/home");
          }
      }
  });


// 端口监听
server.listen("3000",()=>{
    console.log("服务器创建成功！");
})