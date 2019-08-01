/**
 * @name 数据库主页main的路由操作
 * @author 周洋
 * @version 1.0
 * @description 路由
 */

 const express = require("express"),
       Shop_infoService = require("../services/Shop_infoService"),
       MessageBox = require("../utils/MessageBox"),
       imgConfig = require("../config/imgConfig"),
       imgPullConfig = require("../config/imgPullConfig");

 let router = express.Router();

 //渲染主页 并显示信息
router.get("/home", async (req,res) => {
    let shop_infoService = new Shop_infoService();
    try {
        let result = await shop_infoService.showShopList();
        if(result.length > 0){
            let resultObj = {};
            for (let index in result) {
                resultObj[index] = result[index];
            }
            res.render("main/home",{
                imgConfig,
                imgPullConfig,
                shopList : resultObj
            });
        }else if(result.length == 0){
            res.render("main/home",{imgConfig,imgPullConfig});
        }else{
            MessageBox.showAndBack("服务器异常",res);
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误",res);
    }
});

router.get("/pullImg",(req,res)=> {
    res.render("main/pullImg");
})
 
module.exports = router;