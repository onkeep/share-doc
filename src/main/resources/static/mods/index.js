/**
 * 文库主入口
 */
layui.define(['element','layer', 'laytpl', 'form', 'upload', 'util', 'flow'], function(exports){
  
  var $ = layui.jquery
  ,element = layui.element()
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,form = layui.form()
  ,util = layui.util
  ,flow = layui.flow
  ,device = layui.device();
  
  
  var gather = {
    
    //Ajax
    json: function(url, data, success, options){
      var that = this;
      options = options || {};
      data = data || {};
      return $.ajax({
        type: options.type || 'post',
        dataType: options.dataType || 'json',
        data: data,
        url: url,
        success: function(res){
          if(res.status === 0) {
            success && success(res);
          } else {
            layer.msg(res.msg||res.code, {shift: 6});
          }
        }, error: function(e){
          options.error || layer.msg('请求异常，请重试', {shift: 6});
        }
      });
    }

    ,form: {}

  };

  //表单提交
  form.on('submit(*)', function(data){
    var action = $(data.form).attr('action'), button = $(data.elem);
    gather.json(action, data.field, function(res){
      var end = function(){
        if(res.action){
          location.href = res.action;
        } else {
          gather.form[action||button.attr('key')](data.field, data.form);
        }
      };
      if(res.status == 0){
        button.attr('alert') ? layer.alert(res.msg, {
          icon: 1,
          time: 10*1000,
          end: end
        }) : end();
      };
    });
    return false;
  });

  //右下角固定Bar,返回顶部
  util.fixbar();
  
  //首页header变色
  if(layui.cache.page && layui.cache.page == 'index'){
	  $(window).scroll(function() {
	      var a = $(this).scrollTop();
	      if (a > 0) {
	          $(".header").removeClass("no-bg");
	      } else {
	          $(".header").addClass("no-bg");
	      }
	  });
  }
  
  layer.open({
      type: 1,
      title: false,
      shade: false,
      area: ['340px', '215px'],
      offset: 'rb',
      time: 5000,
      closeBtn: 0,
      anim: 2,
      shadeClose: false,
      content: '<div style="background-color:#E55D40; color:#fff;line-height:200px; text-align:center;">本站所有内容只作为演示用</div>'
  });

  exports('izerofx', gather);

});