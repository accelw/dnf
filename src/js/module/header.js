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
                // this.search()
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
                <a class="hot_pic" href="javascript:;" style="display:block; background : url(${this.pic}) no-repeat center center;"></a>
                <a class="hot_name" href="javascript:;">${this.name}</a>
                <div>
                  <span class="price">${this.price}元</span>
                  <span class="likes">喜欢 ： ${this.likes}</span>
                </div>
              </li>`
            //   console.log(this);

            })
            $("#header_box").html(str);
        }
        
        // search(){

        // }
    }
        
   new Header(); 
});