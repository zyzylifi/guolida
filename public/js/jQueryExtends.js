+function($){
    $.fn.extend({
        addTips:function(){
            //this代表的是你的选 择器
            $(this).each(function(index,item){
                var  text = $(this).parent().prev().text().trim();
                if(text==""||text==null||text==undefined){
                    text=$(item).data("label").trim();
                }
                $(item).attr("placeholder","请输入"+text);
            });
        }
    });

    $(".btn-submit-loading").click(function(){
        layer.load({shade:[0.4,"#000"]});   //弹出一个加载层
    });

    $("[data-toggle='ckAll']").click(function(){
        var flag=$(this).prop("checked");
        console.log(this);
        $(this).parentsUntil("table").find("[name='ck']").prop("checked",flag);
    })
}(jQuery)