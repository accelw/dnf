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
                this.allCheck();
            }
            rander(resp){
                // console.log(resp[0].pic[0].pic)
                let html = template('shop-main',{
                    res : resp
                })
                $("#car-list").html(html)
            }
            allCheck(){
                this.container.on('click',"#allchecked", function(){
                    if($("#allchecked").is(":checked")){
                        $(".check").prop("checked",true);
                    }else{
                        $(".check").prop("checked",false);
                    }
                })
                this.container.on('click', function(){
                    console.log($(".check").length ===$(".check:checked").length)
                    if($(".check").length ===$(".check:checked").length){
                        $("#allchecked").prop("checked",true);
                    }else{
                        $("#allchecked").prop("checked",false);
                    }
                })
            }
        }
        new ShopCar();
    })
})    
