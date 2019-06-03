// import { inherits } from "util";

require(['./config'],() =>{
    require(['header','footer'], () =>{
        class List{
            constructor(){
                this.like = $("#list-likes");
                this.toppage = $("#list-toppage");
                this.shop = $("#list-shop");
                this.page = $("#list-page");
                this.init();
            }
            init(){
                $.get('http://rap2api.taobao.org/app/mock/178016/list_hot',resp =>{
                     if(resp.res_code === 200){
                       this.listHot(resp);
                    //    console.log(resp);
                       
                     }
                })
            }
            listHot(list){
                let str = "";
                $.each(list.res_body,function(){
                    if(this.id<4){
                    str += ` <li>
                    <div class="hot_coin">${this.id}</div>
                    <a class="pic" href="javascript:;"><img src = "${this.pic}"></a>
                    <a class="name" href="javascript:;">${this.name}</a>
                    <span class="sel">60天已售<i>${this.seled}</i></span>
                    <span class="price">${this.price}<u>${this.price}</u></span>
                </li>`}else{
                    str +=`<li>
                    <div class="hot_coin2">${this.id}</div>
                    <a class="pic" href="javascript:;"><img src = "${this.pic}"></a>
                    <a class="name" href="javascript:;">${this.name}</a>
                    <span class="sel">60天已售<i>${this.seled}</i></span>
                    <span class="price">${this.price}<u>${this.price}</u></span>
                </li>`
                }
                })
                console.log(str);
                this.like.html(str);
            }
        }
        new List();
    })
})