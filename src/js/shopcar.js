// import { ECANCELED } from "constants";

require(['./config'],() =>{
    require(['template','url','cookie','header','footer'],(template,url,cookie) =>{
        class ShopCar{
            constructor(){
                this.container = $("#car-list")
                this.allcheck = $("#allchecked")
                this.shopCarinit();
            }
            shopCarinit(){
                this.rander(JSON.parse(localStorage.getItem('car')));
                this.Dele();
                this.allCheck();
                this.changeNum();
            }
            rander(resp){
                // console.log(resp[0].pic[0].pic)
                let html = template('shop-main',{
                    res : resp
                })
                $("#car-list").html(html)
            }
           
            Dele(){
                let _this =this;
                this.container.on("click",".detel",function(){
                    // console.log($(this).parent());
                    if(confirm("确认删除吗？")){
                        // console.log( JSON.parse(localStorage.getItem('car')))
                        
                        $(this).parent().remove(); 
                        let carList = JSON.parse(localStorage.getItem('car')),
                            i = -1;
                        let isExist = carList.some((car,index) =>{
                            // console.log(car.id)
                            i = index
                          return $(this).parent()[0].id === car.id
                        })
                        if (isExist){
                            // console.log(carList)
                            carList.splice(i,1)
                            localStorage.setItem('car',JSON.stringify(carList))                            
                            alert("删除成功")
                            if($(".check").length ===$(".check:checked").length){
                                $("#allchecked").prop("checked",true);
                            }else{
                                $("#allchecked").prop("checked",false);
                            }                           
                         }
                   }
                   
                   _this.Price($(this)); 
                })
                // this.container.on("click","#delet",function(){
                //    console.log($(".check:checked").parent().parent())
                //    if(confirm("确认删除吗？")){
                //     console.log( JSON.parse(localStorage.getItem('car')))
                    
                //     $(".check:checked").parent().parent().remove(); 
                   
                //    }
                // })
            }
            allCheck(){
                this.container.on('click',"#allchecked", () =>{
                    if($("#allchecked").is(":checked")){
                        $(".check").prop("checked",true);
                    }else{
                        $(".check").prop("checked",false);
                    }
                    this.Price($(this)); 
                })
                this.container.on('click','.check', () =>{
                    console.log($(".check").length ===$(".check:checked").length)
                    if($(".check").length ===$(".check:checked").length){
                        $("#allchecked").prop("checked",true);
                    }else{
                        $("#allchecked").prop("checked",false);
                    }
                    this.Price($(this)); 
                })
            }
            changeNum(){
                let _this = this;
                this.container.on("click","#num-down",function(){
                    //  console.log($(this).siblings("input").val())
                    if($(this).siblings("input").val()>1){
                        $(this).siblings("input").val(($(this).siblings("input").val()) - 1);
                        let carList = JSON.parse(localStorage.getItem('car')),
                            i = -1;
                        let isExist = carList.some((car,index) =>{
                            // console.log($(this).parent().parent()[0].id)
                            // console.log(index)
                            i = index
                          return $(this).parent().parent()[0].id === car.id
                        })
                        if (isExist){
                            carList[i].num = $(this).siblings("input").val()
                            localStorage.setItem('car',JSON.stringify(carList))
                         }
                    }
                    _this.Price($(this)); 
                })
                this.container.on("click","#num-up",function(){                   
                        $(this).siblings("input").val(Number($(this).siblings("input").val()) + 1);
                        let carList = JSON.parse(localStorage.getItem('car')),
                            i = -1;
                        let isExist = carList.some((car,index) =>{
                            // console.log($(this).parent().parent()[0].id)
                            // console.log(index)
                            i = index
                          return $(this).parent().parent()[0].id === car.id
                        })
                        if (isExist){
                            carList[i].num = $(this).siblings("input").val()
                            localStorage.setItem('car',JSON.stringify(carList))
                         }
                         _this.Price($(this));                   
                })
                this.container.on("focusout",".num",function(){
                    let carList = JSON.parse(localStorage.getItem('car'))
                    carList[i].num = $(this).siblings("input").val()
                    localStorage.setItem('car',JSON.stringify(carList))
                })
            }
            Price(is){
                if(is[0]!= this ){
                    let numb = is.siblings('input').val()
                    let pri = is.parent().siblings('.price').children('span').html()
                    // console.log(is)
                    is.parent().siblings('.all').children().html('￥'+numb*pri)
                }
                if($(".check:checked").length>=1 && $(this).parent()){
                    let checkPrice = 0
                    let checkNum = 0
                    $(".check:checked").each(function(){
                         checkPrice += Number($(this).parent().siblings('.all').children().html().slice(1))
                         checkNum += Number($(this).parent().siblings('.num').children('input').val())  
                    }) 
                    $('#price').html(checkPrice)
                    $('#num').html(checkNum)
                }else{
                    $('#price').html(0) 
                    $('#num').html(0)
                }
                
            }
        }
        new ShopCar();
    })
})    
