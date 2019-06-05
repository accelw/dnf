// import { resolve } from "dns";

define(['jquery'], () => {
    class Header{
        constructor(){
            this.container = $('header')
            this.readyload().then(() =>{
               $.get('http://rap2api.taobao.org/app/mock/178016/header_box',resp =>{
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
            console.log(list.res_body);
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
                        console.log(this);
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