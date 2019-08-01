/**
 * @name 数据库操作对象
 * @author 周洋
 * @version 1.0
 * @readonly mysql
 */

 const mysql=require("mysql");

class DBHelper{
    getConn(){
        let conn=mysql.createConnection({
            host:"127.0.0.1",
            port:3306,
            user:"root",
            password:"zy961125",
            database:"guolida",
            multipleStatements:true                 //开启多条Sql语句支持
        });

        conn.connect();
        return conn;
    }
}

module.exports=DBHelper;