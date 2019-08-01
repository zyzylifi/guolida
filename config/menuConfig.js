const menuConfig=[
    {
        id:"shop",
        title:"店铺管理",
        item:[
            {text:"新增店铺",url:"/admin_info/addstore"},
            {text:"修改店铺",url:"#"},
            {text:"删除店铺",url:"/admin_info/delshop"}
        ]
    },
    {
        id:"food",
        title:"店铺菜品",
        item:[
            {text:"新增菜品",url:"#"},
            {text:"修改菜单",url:"#"},
            {text:"删除菜品",url:"#"}
        ]
    },{
        id:"user",
        title:"用户管理",
        item :[
            {text:"用户列表",url:"#"},
            {text:"VIP用户",url:"#"},
            {text:"普通用户",url:"#"}
        ]
    },{
        id:"admin",
        title:"系统设置",
        item:[
            {text:"个人信息",url:"#"},
            {text:"修改密码",url:"/admin_info/changepassw"},
            {text:"添加管理员",url:"/admin_info/addadmin"}
        ]
    }
]

module.exports=menuConfig;