// import { resolve } from "dns";

define(['url','cookie','jquery'], (url,cookie) => {
    class Header{
        constructor(){
            this.container = $('header')
            this.readyload().then(() =>{
                if($.cookie('user')){
                    let user = $.cookie('user').slice(" ").split(",")
                    $("#login").html(`<span>欢迎您</span>
                    <a href="javascript:;">${user[0]}</a>
                    <a href="/html/shopcar">购物车</a>
                    <a id="logout" class="logout"  href="">退出</a>`)
                }
                $("#login").on('click','#logout',function(){
                    $.removeCookie('user',{path:'/'})
                })

               $.get(url.baseUrl+'/header_box',resp =>{
                    if(resp.res_node == 200){
                       this.rander(resp);
                    //    console.log(resp);
                       
                    }
               })
                $('#header_nav_hover').hover(() =>{
                    $('.hot_box').attr("style","display :block")
                },() =>{
                    $('.hot_box').attr("style","display :none")
                })
                $('.hot_box').hover(() =>{
                    $('.hot_box').attr("style","display :block")
                },() =>{
                    $('.hot_box').attr("style","display :none")
                })
                this.search()
            })
        }
        readyload () {
            return new Promise(resolve =>{
               this.container.load('/html/module/header.html',() =>{
                   resolve();
               }) 
            })
        }
        rander(list){
            let str = "";
            // console.log(list.res_body);
            $.each(list.res_body,function () {
                str += `
                <li id="${this.id}header_hot">
                <a class="hot_pic" href="/html/detail.html?id=${this.id}"><img src ="${this.pic}"></a>
                <a class="hot_name" href="/html/detail.html?id=${this.id}">${this.name}</a>
                <div>
                  <span class="price">${this.price}元</span>
                  <span class="likes">喜欢 ： ${this.likes}</span>
                </div>
              </li>`
            //   console.log(this);

            })
            $("#header_box").html(str);
        }
        
        search(){
            this.search = $("#search-box")
            this.searchBtn = $("#search-btn")
            this.search.on("keyup",() =>{
                let val = this.search.val();
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=?`,resp =>{
                    let arr = resp.s,
                        str = "";
                    $.each(arr,function(){
                        str += `<li>${this}</li>`
                        // console.log(this);
                    })
                    $("#search-more").html(str);
                })
            })
            $("#search-more").on("click","li",function(){
                $("#search-box").val($(this).text());
                $("#search-more").html(null);
            })
            this.searchBtn.on("click",() =>{
                console.log($("#search-box").val());
            })
        }
    }   
   new Header(); 
   return false;
});