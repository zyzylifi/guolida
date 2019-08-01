const DBHelper=require("../utils/DBHelper");

class BaseService extends DBHelper{
    constructor(tableName){
        super();
        this.tableName=tableName;
    }
    /**
     * @name 根据模型自己创建新增的Sql语句
     * @param { Object} model 模型对象
     * @returns {String} 返回创建好的Sql语句 
     */
    createInsertSql(model){
        let keys=Object.keys(model);
        let values=Object.values(model);
        let strSql=`insert into ${this.tableName} (${keys.toString()}) values (${new Array(keys.length).fill("?").toString()})`;
        return strSql;
    }
}

module.exports=BaseService;