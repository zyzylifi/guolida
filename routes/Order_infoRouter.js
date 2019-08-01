/**
 * @name 订单页面的router操作
 * @author 周洋
 * @version 1.0
 * @description 路由
 */

const express = require("express"),
      Order_infoService = require("../services/Order_infoService"),
      Shop_infoService = require("../services/Shop_infoService"),
      Food_infoService = require("../services/Food_infoService"),
      MessageBox = require("../utils/MessageBox"),
      Foodtype_infoService = require("../services/Foodtype_infoService");

let router = express.Router();

router.get("/saveOrder", async (req,res) => {
    let obj = req.query.data;
    let {o_price,s_id,o_date,o_nm} = JSON.parse(obj)
    let u_id = req.session.userInfo.u_id;
    let order_infoService = new Order_infoService();
    let shop_infoService = new Shop_infoService();
    try {
        //先将从商店点菜的订单保存到订单表中，然后再查询订单表 显示所有订单消息
        let shopResult = await shop_infoService.showShop(s_id);
        let insertObj = {
            s_photo : shopResult[0].s_photo,
            s_name : shopResult[0].s_name,
            // f_name : "0",
            o_price : o_price,
            o_date : o_date,
            s_id : s_id,
            u_id : u_id,
            o_nm : o_nm
        }
        // console.log(insertObj);
        let orderFlag = await order_infoService.saveOrder(insertObj);
        // console.log(orderFlag);
        if(orderFlag){
            res.json({
                status : "success",
                msg : "订单保存成功"
             })
        }else{
            res.json({
                status : "fail",
                msg : "订单保存失败"
            });
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误",res);
    }
});

//渲染订单页面
router.get("/order", async (req,res) =>{
    let order_infoService = new Order_infoService();
    let userInfo = req.session.userInfo;
    try {
        
        let result = await order_infoService.showOrderList(userInfo);
        if(result.length > 0){
            let resultObj = {};
            for (let index in result) {
                resultObj[index] = result[index];
            }
            res.render("order_info/order",{
                orderList : resultObj
            })
        }
        else if(result == 0){  //返回0，说明未登录
            res.render("order_info/order",{result:result,userInfo:userInfo});
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误",res);
    }
});

router.get("/shopMenu", async (req,res) => {
    let {id} = req.query;
    let shop_infoService = new Shop_infoService();
    let foodtype_infoService = new Foodtype_infoService();
    let food_infoService = new Food_infoService();
    try {
        let result = await shop_infoService.showShopMenu(id);
        let result2 = await foodtype_infoService.showFoodType(id);
        let result3 = await food_infoService.showFoodList(id);
        let obj = {};
        let obj1 = {};
        for (let index in result2) {
            obj[index] = result2[index];
        }
        for (let index in result3) {
            obj1[index] = result3[index];
        }
        if(result.length == 1){
            let length = Object.keys(obj).length;
            res.render("order_info/shopMenu",{
                shopMessage : result[0],
                foodType : obj,
                length,
                foodList : obj1
             });
        }
    } catch (err) {
        MessageBox.showAndBack("服务器错误",res);
        console.log(err);
    }
});
module.exports = router;