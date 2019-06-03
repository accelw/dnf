

require(['./config'],() =>{
    require(['header','footer'], () =>{
        class Index{
            constructor(){
                this.pic = $("#hot_pic");
                this.shop = $("#menu_shop");
                this.init();
            }

            init(){
                $.get('http://rap2api.taobao.org/app/mock/178016/index_pic',resp =>{
                     if(resp.res_code == 200){
                       this.indPic(resp);
                    //    console.log(resp);
                       
                     }
                })
                $.get('http://rap2api.taobao.org/app/mock/178016/index_list',resp =>{
                    if(resp.res_code == 200){
                      this.indList(resp);
                    //   console.log(resp);
                      
                    }
               })        
            }
            indPic(list){
                let str = "";
                // console.log(list.res_body);
                $.each(list.res_body,function () {
                    str += `<a class="ban${this.id}" href="javascript:;" ><img src = "${this.pic}"></a>`
                   
                //    console.log(this);

                })
                $("#hot_pic").html(str);
            }
            indList(list){
                let str = "";
                console.log(list.res_body);
                $.each(list.res_body,function () {
                    str += `<li id = "${this.id}menuId">
                    <a class="hot_pic" href="javascript:;"><img src = "${this.pic}"></a>
                    <a class="hot_name" href="javascript:;">${this.name}</a>
                    <div>
                      <span class="price">${this.price}元</span>
                      <span class="likes">喜欢 ： ${this.likes}</span>
                    </div>
                  </li>`
                   
                   console.log(this);

                })
                $("#menu_shop").html(str);
            }
        }
    new Index();
    })
})