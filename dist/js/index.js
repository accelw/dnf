"use strict";function _classCallCheck(i,n){if(!(i instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(i,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,t.key,t)}}function _createClass(i,n,e){return n&&_defineProperties(i.prototype,n),e&&_defineProperties(i,e),i}require(["./config"],function(){require(["header","footer"],function(){new(function(){function i(){_classCallCheck(this,i),this.pic=$("#hot_pic"),this.shop=$("#menu_shop"),this.init()}return _createClass(i,[{key:"init",value:function(){var n=this;$.get("http://rap2api.taobao.org/app/mock/178016/index_pic",function(i){200===i.res_code&&n.indPic(i)}),$.get("http://rap2api.taobao.org/app/mock/178016/index_list",function(i){200===i.res_code&&n.indList(i)})}},{key:"indPic",value:function(i){var n="";$.each(i.res_body,function(){n+='<a class="ban'.concat(this.id,'" href="javascript:;" ><img src = "').concat(this.pic,'"></a>')}),$("#hot_pic").html(n)}},{key:"indList",value:function(i){var n="";console.log(i.res_body),$.each(i.res_body,function(){n+='<li id = "'.concat(this.id,'menuId">\n                    <a class="hot_pic" href="javascript:;"><img src = "').concat(this.pic,'"></a>\n                    <a class="hot_name" href="javascript:;">').concat(this.name,'</a>\n                    <div>\n                      <span class="price">').concat(this.price,'元</span>\n                      <span class="likes">喜欢 ： ').concat(this.likes,"</span>\n                    </div>\n                  </li>"),console.log(this)}),$("#menu_shop").html(n)}}]),i}())})});