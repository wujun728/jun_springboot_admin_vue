var data = {};
var menus = [{
    menuName:"首页",
    url:"/admin/lyear_main.html"
}];
jQuery.ajax({
    method:"post",
    url:"/admin/user/getUserSession",
    dataType:"JSON",
    async:false,
    success:function(resp){
        data = resp.data;
        menus.push(...data.menus)
    }
});
dealMenus(menus);
function dealMenus(list){
    for(let i=0;i<list.length;i++){
        let item = list[i];
        item.pageName = item.menuName;
        if(item.children && item.children.length>0){
            item.url = item.children[0].url;
            item.pageName = item.children[0].menuName;
            dealMenus(item.children);
        }
    }
}

AMIS_JSON={
    "name":"page",
    "type": "page",
    "title":"${name}",
    "asideResizor": false,
    "css": {
        ".leftWidth":{
            "width":"220px !important",
            "overflow-x":"hidden !important"
        },
        ".leftWidth .cxd-Table-content":{
            "overflow-x":"hidden !important"
        },
        ".amis-routes-wrapper .cxd-Page-body":{
            "padding":"0px"
        },
        ".is-checked":{
            "background":"none !important"
        },
        ".border-0 .cxd-Button":{
            "border":"0px"
        }
    },
    "asideClassName":"leftWidth",
    "aside": [
        {
            "title":"导航菜单",
            "type":"table",
            "autoFillHeight":true,
            "data":menus,
            "columns":[{
                "name":"menuName"
            }],
            "itemAction":{
                "disabledOn":"children.length==0",
                "type":"action",
                "actionType":"reload",
                "target":"page?src=${url}&name=${pageName}"
            }
        }
    ],
    "data":{
        "src":"/admin/lyear_main.html",
        "name":"首页",
        "userName":data.name
    },
    "body": [
        {
            "name":"mainFrame",
            "type": "iframe",
            "src":"${src}"
        }
    ],
    "toolbar":[{
        "type":"avatar",
        "src":data.avatar
    },{
        "type": "dropdown-button",
        "label": "${userName}",
        "className":"border-0",
        "buttons": [
            {
                "type": "button",
                "label": "修改密码",
            },
            {
                "actionType":"link",
                "type": "button",
                "url":"/admin/user/logout",
                "label": "退出登录"
            }
        ]
    }]
}