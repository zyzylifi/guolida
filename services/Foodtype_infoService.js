/**
 * @name 菜品类型数据库操作帮助类
 * @author 吴灿
 * @version 1.0.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Foodtype_infoService extends BaseService{
    constructor(){
        super("foodtype_info");
    }

    /**
     * @name 查询菜品的类型
     * @param {String} id 查询的id
     * @returns {Promise} 返回数据库的操作
     */
    showFoodType(id){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where isDel=0 and s_id=?`;
            conn.query(strSql,[id],(err,result) =>{
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

module.exports = Foodtype_infoService;
