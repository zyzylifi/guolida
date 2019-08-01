/**
 * @name 管理员数据库操作帮助类
 * @author 周洋
 * @version 1.0.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Admin_infoService extends BaseService{
    constructor(){
        super("admin_info");
    }
    /**
     * @name 根据管理员账号和密码进行登录检测
     * @param {Object} model 保存着管理员账号和密码的对象
     * @returns {Promise} 异步操作
     */
    checkLogin(model){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            let {a_id,a_password} = model;
            let strSql = `select * from ${this.tableName} where a_id=? and a_password=?`;
            conn.query(strSql,[a_id,a_password],(err,result) =>{
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
     * @name 添加商铺
     * @param {Object} model 保存着添加的数据
     * @returns {Promise} 异步操作
     */
    addstores(model) {
        return new Promise((resolve, reject) => {
            // console.log(model)
            let {s_name,s_shortPrice,s_sendPrice,s_special,adminInfo,s_icon} = model;
            let conn = super.getConn();
            var storetable = "shop_info";
            let insertSql = `insert into ${storetable} (s_name,s_shortPrice,s_sendPrice,s_special,adminid,s_photo) values (?,?,?,?,?,?)`;
            conn.query(insertSql, [s_name,s_shortPrice,s_sendPrice,s_special,adminInfo,s_icon], (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
        });
    }

    /**
     * @name 查询管理员的店铺
     * @param {Object} model 
     * @returns {Promise} 异步操作
     */
    showshop(model){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            var storetable = "shop_info";
            // console.log(model)
            let adminid = model;
            let strSql = `select * from ${storetable} where isDel=0 and adminid=?`;
            conn.query(strSql,[adminid],(err,result) =>{
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
     * @name 删除店铺操作
     * @param {Object} model 
     * @returns {Promise} 异步操作
     */
    dodelshop(s_name,adminid){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            var storetable = "shop_info";
            let strSql = `update ${storetable} set isDel = 1 where s_name=? and adminid=?`;
            conn.query(strSql,[s_name,adminid],(err,result) =>{
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
     * @name 更改管理员密码
     * @param {Object} model 保存着管理员账号和密码的对象
     * @returns {Promise} 异步操作
     */
    doEditpassw(model){
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let {a_id,a_password} = model;
            let updateSql = `update ${this.tableName} set a_password=? where a_id=?`;
            conn.query(updateSql,[a_password,a_id],(err,result) =>{
                if(err){
                    reject(err);
                }else{
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        })
    }
    /**
     * @name 添加管理员
     * @param {Object} model 保存着管理员账号和密码的对象
     * @returns {Promise} 异步操作
     */
    addadmin(model) {
        return new Promise((resolve, reject) => {
            let {a_id,a_password} = model;
            let conn = super.getConn();
            let insertSql = `insert into ${this.tableName} (a_id,a_password) values (?,?)`;
            conn.query(insertSql, [a_id,a_password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
        });
    }
}
    

module.exports = Admin_infoService;