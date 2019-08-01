/**
 * @name 收货地址数据库操作帮助类
 * @author 周洋
 * @version 1.0.0
 * @requires BaseService
 */

const BaseService = require("./BaseService");

class Addr_infoService extends BaseService{
    constructor(){
        super("addr_info");
    }

    /**
     * @name 用户收货地址数据库操作类
     * @param {Object} model 要保存到数据库中的数据 
     * @version 1.0
     * @returns {Promise} 返回操作结果
     */
    addUserAddr(model1,model2){
        return new Promise((resolve, reject) => {
            let u_id = model1.u_id;
            let {consignee,phone,u_addr,isDefault} = model2;
            let conn = super.getConn();
            let insertSql = `insert into ${this.tableName} (consignee,phone,u_addr,isDefault,u_id) values (?,?,?,?,?)`;
            conn.query(insertSql,[consignee,phone,u_addr,isDefault,u_id],(err,result) => {
                if(err){
                    reject(err);
                }else{
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            })
        });
    }

    /**
     * @name 通过用户账号查询地址信息
     * @param {Object} model 用户账号 
     * @version 1.0
     * @returns {Promise} 返回操作结果
     */
    showAddrList(model){
        return new Promise((resolve,reject) => {
           let conn = super.getConn();
           let strSql = `select * from ${this.tableName} where isDel=0 and u_id=?`;
           conn.query(strSql,[model],(err,result) => {
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
     * @name 查询地址信息
     * @param {Object} model 地址表的id 
     * @version 1.0
     * @returns {Promise} 返回操作结果
     */
    editUserAddr(id){
        return new Promise((resolve,reject) => {
            let conn = super.getConn();
            let strSql = `select * from ${this.tableName} where id=?`;
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

    /**
     * @name 执行更新地址信息的操作
     * @param {Object} model 要更新的数据信息 
     * @version 1.0
     * @returns {Promise} 返回操作结果
     */
    doEditUserAddr(model){
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let {addrId,consignee,phone,u_addr,isDefault} = model;
            isDefault = undefined ? "0" : "1";
            let updateSql = `update ${this.tableName} set consignee=?,phone=?,u_addr=?,isDefault=? where id=?`;
            conn.query(updateSql,[consignee,phone,u_addr,isDefault,addrId],(err,result) =>{
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
     * @name 根据id执行删除当前地址操作
     * @param {Number} id 表id 
     * @version 1.0
     * @returns {Promise} 返回数据库操作
     */
    deleteUserAddr(id){
        return new Promise((resolve, reject) => {
            let conn = super.getConn();
            let deleteSql = `update ${this.tableName} set isDel = 1 where id=?`;
            conn.query(deleteSql,[id],(err,result) => {
                if(err){
                    reject(err);
                }else{
                    let flag = result.affectedRows > 0 ? true : false;
                    resolve(flag);
                }
                conn.end();
            });
        });
    }
}

module.exports = Addr_infoService;