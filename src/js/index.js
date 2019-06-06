

require(['./config'],() =>{
    require(['swiper','url','header','footer'], (Swiper,url) =>{
        class Index{
            constructor(){
                this.pic = $("#hot_pic");
                this.shop = $("#menu_shop");
                this.init();
                this.initSwiper(); 
            }

            init(){
                $.get(url.baseUrl+'/index_pic',resp =>{
                     if(resp.res_code === 200){
                       this.indPic(resp);
                    //    console.log(resp);
                       
                     }
                })
                $.get(url.baseUrl+'/index_list',resp =>{
                    if(resp.res_code === 200){
                      this.indList(resp);
                    //   console.log(resp);
                      
                    }
               })  
                    
            }
            indPic(list){
                let str = "";
                // console.log(list.res_body);
                $.each(list.res_body,function () {
                    str += `<a class="ban${this.id}" href="/html/list.html?id=${this.id}" ><img src = "${this.pic}"></a>`
                   
                //    console.log(this);

                })
                $("#hot_pic").html(str);
            }
            indList(list){
                let str = "";
                // console.log(list.res_body);
                $.each(list.res_body,function () {
                    str += `<li id = "${this.id}menuId">
                    <a class="hot_pic" href="/html/detail.html?id=${this.id}"><img src = "${this.pic}"></a>
                    <a class="hot_name" href="/html/detail.html?id=${this.id}">${this.name}</a>
                    <div>
                      <span class="price">${this.price}元</span>
                      <span class="likes">喜欢 ： ${this.likes}</span>
                    </div>
                  </li>`
                   
                //    console.log(this);

                })
                $("#menu_shop").html(str);
            }
            initSwiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    effect: 'fade', 
                    loop: true, 
                    autoplay:{
                        stopOnLastSide:true,
                    },
                    fadeEffect: {
                    crossFade: true,
                    },     
                    pagination: {
                      el: '.swiper-pagination',
                      clickable : true,
                    },        
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                  })    
            }
        }
    new Index();
    })
    return false;
})