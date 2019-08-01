/**
 * @name 店铺数据库操作帮助类
 * @author 周洋
 * @version 1.0.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Shop_infoService extends BaseService{
    constructor(){
        super("shop_info");
    }
    /**
     * @name 查询商店数据库数据
     * @version 1.0
     * @returns {Promise} 保存数据库操作
     */
    showShopList(){
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where isDel=0`;
            conn.query(strSql,[],(err,result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
                conn.end();
            });
        });
    }

    /**
     * @name 根据店铺id查询当前店铺的信息
     * @version 1.0
     * @param {String} s_id 店铺的id号
     * @returns {Promise} 返回数据库操作
     */
    showShop(s_id){
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where isDel=0 and id=?`;
            conn.query(strSql,[s_id],(err,result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
                conn.end();
            });
        });
    }
    
    /**
     * @name 通过id查询店铺中菜单信息
     * @param {String} id 店铺id
     * @returns {Promise} 保存数据库操作
     */
    showShopMenu(id){
        return new Promise((resolve, reject) => {
           let conn = super.getConn();
           let strSql = `select * from ${this.tableName} where id=?`
           conn.query(strSql,[id],(err,result) => {
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

module.exports = Shop_infoService;
