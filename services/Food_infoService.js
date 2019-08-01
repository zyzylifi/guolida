/**
 * @name 菜品数据表操作帮助类
 * @author 吴灿
 * @version 1.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Food_infoService extends BaseService{
    constructor(){
        super("food_info");
    }
    /**
     * @name 通过店铺id查询菜品的信息
     * @param {String} id 店铺id
     * @version 1.0
     * @returns {Promise} 返回数据库操作
     */
    showFoodList(id){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where isDel=0 and s_id=?`;
            conn.query(strSql,[id],(err,result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
                conn.end();
            });
        })
    }
}
module.exports = Food_infoService;