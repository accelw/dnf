require(['./config'],() =>{
    require(['cookie','url','template','header','footer'], (cookie,url,template,header) =>{
        class Detail{
            constructor(){
                this.container = $("#detail-container")
                // this.picBox = $("#pic-box")
                // this.midPicBox = $("#mid-pic-box")
                // this.color = $("#col")
                // this.size = $("#siz")
                this.numDown = $("#num-down")
                this.numUp = $("#num-up")
                this.detailInit()
            }
            detailInit(){
                this.id = Number(location.search.slice(4));
                $.get(url.baseUrl + '/detail'
                // + (this.id)
                ,resp =>{
                    // console.log(resp)
                    if(resp.res_code === 200){
                        this.render(resp.res_body);
                        this.detail = {
                            id : location.search.slice(4),
                            title : resp.res_body.title,
                            price : resp.res_body.price,
                            pic : resp.res_body.pic,
                            old_price : resp.res_body.old_price
                        }                          
                    }
                })
                this.changePic();
                this.chickLike();
                this.changeCol_Size();
                this.changeNum(); 
                this.chickCollect();
                this.addCar();
            }
            render(resp){
                // console.log(resp.Color)
                let html = template('detail_content',{
                pic : resp.pic,
                color : resp.Color,
                size : resp.Size,
                id :resp.id,
                title: resp.title,
                hot: resp.hot,
                price : resp.price,
                old_price : resp.old_price,
                sel : resp.sel,
                talk : resp.sel,
                likes : resp.likes
                })
                $("#detail-container").html(html)
                
            }
            changePic(){
                this.container.on("mouseenter","li" , function(){
                    $(this).addClass("show").siblings().removeClass("show");
                    $(this).parent().parent().siblings().children().eq($(this).index()).removeClass("hidden").siblings().addClass("hidden")
                })
            }
            chickLike(){
                this.container.on("click","#like",function(){
                    if($(this).hasClass("like_click")){
                        setTimeout(function(){
                         alert("您已添加喜欢")
                        },200)
                     }
                    $(this).removeClass("point").addClass("like_click").html("已喜欢");
                   
                })
            }
            changeCol_Size(){
                this.container.on("click","a",function(){
                    $(this).addClass("click").parent().siblings().children().removeClass("click");
                })

            }
            changeNum(){
                this.container.on("click","#num-down",function(){
                    // console.log($(this).siblings("input").val())
                    if($(this).siblings("input").val()>1){
                        $(this).siblings("input").val(($(this).siblings("input").val()) - 1);
                    }
                })
                this.container.on("click","#num-up",function(){                   
                        $(this).siblings("input").val(Number($(this).siblings("input").val()) + 1);
                })
            }
            chickCollect(){
                this.container.on("click","#collect",function(){
                    // console.log($(this))
                    if($(this).hasClass("like_click")){
                        setTimeout(function(){
                         alert("您已添加收藏")
                        },200)
                     }
                    $(this).addClass("like_click").html(`已收藏（${{likes}}位勇士收藏）`);
                   
                })
            }

            addCar(){
                this.container.on("click","#add-car",()=>{
                    // console.log(this)
                  if($.cookie('user')){  
                    this.detail = {
                        ...this.detail,
                        num : Number($("#car-num").val())
                    }
                    let carList = localStorage.getItem('car')
                    if(carList){
                        carList = JSON.parse(carList)
                        let i = -1
                        let isExist = carList.some((car,index) =>{
                            i = index
                            return car.id === this.detail.id
                        })
                        if(isExist){
                            carList[i].num += this.detail.num
                        }else{
                            carList.push(this.detail)
                        }
                        localStorage.setItem('car',JSON.stringify(carList))
                    } else{
                        localStorage.setItem('car',JSON.stringify([this.detail]))
                    }
                }else{
                    alert("请先登录")
                    $(location).attr('href', 'http://localhost:2333/html/login.html');
                }
                })
            }
        }
        new Detail();
    })
})