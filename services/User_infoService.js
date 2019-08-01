/**
 * @name 用户数据库操作帮助类
 * @author 周洋
 * @version 1.0.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class User_infoService extends BaseService {
    constructor() {
        super("user_info");
    }
    /**
     * @name 用户注册
     * @param {Object} parme 注册的用户名和密码
     * @returns {Promise} 返回执行数据库以后的操作 
     */
    saveUser(model) {
        return new Promise((resolve, reject) => {
            let { u_id, u_password } = model;
            let conn = super.getConn();
            let insertSql = `insert into ${this.tableName} (u_id,u_password) values (?,?)`;
            conn.query(insertSql, [u_id, u_password], (err, result) => {
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
    /**
     * @name 检测注册的账户名是否已经被注册过
     * @param {Object} v 要检测的用户名 
     * @version 1.0
     * @returns {Promise} 返回执行数据库之后的操作
     */
    checkUserName(v) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where s_id = ?`;
            conn.query(strSql, [v], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let flag = result.length > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
        });
    }
    /**
     * @name 登录检测用户名和密码是否正确
     * @param {Object} model 登录要检测的账号和密码 
     * @returns {Promise} 返回执行数据库之后的操作
     * @version 1.0
     */
    checkLogin(model) {
        return new Promise((resolve, reject) => {
            let { u_id, u_password } = model;
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where u_id=? and u_password=?`;
            conn.query(strSql, [u_id, u_password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                conn.end();
            });
        });
    }
    /**
     * @name 修改用户个人信息
     * @param {Object} model1 用户ID
     * @param {Object} model2 用户要保存的基本信息
     */
    updateUser(model1, model2) {
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let u_id = model1.u_id;
            let { u_name, u_age, u_sex, u_sign, u_icon } = model2;
            let updateSql = "";
            let paramsArr = [];
            if (u_icon != "") {
                updateSql = `update ${this.tableName} set u_name=?,u_age=?,u_sex=?,u_sign=?,u_icon=? where u_id=?`;
                paramsArr = [u_name, u_age, u_sex, u_sign, u_icon, u_id];
            }
            else {
                updateSql = `update ${this.tableName} set u_name=?,u_age=?,u_sex=?,u_sign=? where u_id=?`;
                paramsArr = [u_name, u_age, u_sex, u_sign, u_id];
            }
            conn.query(updateSql, paramsArr, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
        })
    }

    /**
     * @name 按照商铺名称查询
     * @param {Object} model 商铺名称 
     * @returns {Promise} 返回操作结果
     */
    searchsp(model){
        return new Promise((resolve,reject) => {
           let conn = super.getConn();
           let id = "'%"+model.s_name+"%'";
           let strSql = `select * from shop_info where isDel=0 and s_name like ${id}`;
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
     * @name 根据用户名把其它信息显示出来
     * @param {Object} model 用户名 
     * @returns {Promise} 返回操作结果
     */
    showUserMessage(model) {
        if(model==undefined){
            return "！";
        }else{
            return new Promise((resolve, reject) => {
                let conn = super.getConn();
                let u_id = model.u_id;
                let strSql = `select * from ${this.tableName} where u_id=?`;
                conn.query(strSql, [u_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    conn.end();
                });
            });
        }
    }



}

module.exports = User_infoService;