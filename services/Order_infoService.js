/**
 * @name 订单表数据库操作帮助类
 * @author 周洋
 * @version 1.0.0
 * @requires BaseService
 */

 const BaseService = require("./BaseService");

 class Order_infoService extends BaseService{
     constructor(){
         super("order_info");
     }

     /**
      * @name 查询订单数据库
      * @version 1.0
      * @returns {Promise} 返回数据库操作
      */
     showOrderList(model){
        if(model==undefined){
            return 0;
        }else{
            return new Promise((resolve, reject) => {
                let conn = super.getConn();
                let u_id = model.u_id;
                let strSql = `select * from ${this.tableName} where isDel=0 and u_id=? order by id desc`;
                conn.query(strSql,[u_id],(err,result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    conn.end();
                });
            });
        }
        
     }

     /**
      * @name 保存订单相关信息
      * @param {Object} model 要保存的数据 
      * @returns {Promise} 返回数据库操作
      */
     saveOrder(model){
         return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let values=Object.values(model);
            // console.log(model);
            let insertSql = super.createInsertSql(model);
            conn.query(insertSql,values,(err,result) => {
                if(err){
                    reject(err);
                    console.log(err);
                }else{
                    // console.log(result);
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
         });
     }
 }
module.exports = Order_infoService;