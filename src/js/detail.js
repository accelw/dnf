require(['./config'],() =>{
    require(['url','template','header','footer'], (url,template,header) =>{
        class Detail{
            constructor(){
                this.picBox = $("#pic-box")
                this.midPicBox = $("#mid-pic-box")
                this.color = $("#col")
                this.like = $("#like")
                this.size = $("#siz")
                this.numDown = $("#num-down")
                this.numUp = $("#num-up")
                this.detailInit()
            }
            detailInit(){
                this.changePic();
                this.chickLike();
                this.changeColor();
                this.changeSize();
                this.changeNum();
            }
            changePic(){
                this.picBox.on("mouseenter","li" , function(){
                    $(this).addClass("show").siblings().removeClass("show");
                    $("#mid-pic-box").children().eq($(this).index()).removeClass("hidden").siblings().addClass("hidden");
                })
            }
            chickLike(){
                this.like.on("click",function(){
                    if($(this).hasClass("like_click")){
                        setTimeout(function(){
                         alert("您已添加喜欢")
                        },200)
                     }
                    $(this).removeClass("point").addClass("like_click").html("已喜欢");
                   
                })
            }
            changeColor(){
                this.color.on("click","a",function(){
                    $(this).addClass("click").parent().siblings().children().removeClass("click");
                })

            }
            changeSize(){
                this.size.on("click","a",function(){
                    $(this).addClass("click").parent().siblings().children().removeClass("click");
                })
            }
            changeNum(){
                this.numDown.on("click",function(){
                    if($(this).siblings("input").val()>1){
                        $(this).siblings("input").val(($(this).siblings("input").val()) - 1);
                    }
                })
                this.numUp.on("click",function(){                   
                        $(this).siblings("input").val(Number($(this).siblings("input").val()) + 1);
                })
            }
        }
        new Detail();
    })
})