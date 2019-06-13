 

require(['./config'],() =>{
    require(['swiper','url','cookie','jquery'],(Swiper,url,cookie) =>{
        class Signup{
            constructor(){
                this.name = $("#name")
                this.password = $("#password")
                this.phone = $("#phoneNum")
                this.check = $("#check")
                this.sub = $("#sub")
                this.initSwiper();
                this.init();
            }
            initSwiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    effect: 'fade',  
                    autoplay:{
                        stopOnLastSide:true,
                        disableOnInteraction:false
                    },
                    fadeEffect: {
                    crossFade: true,
                    },     
               })

            }
            init(){
                this.name.on("focus",function(){
                    $("#name").addClass("focus")
                    $("#name").removeClass("warnning")
                    $("#name-warnning").parent().addClass("hidden")
                })
                this.name.on("focusout",function(){
                    if($("#name").val() === ""){
                        $("#name-warnning").parent().removeClass("hidden")
                        $("#name").addClass("warnning")
                    }
                    $("#name").removeClass("focus")
                })
                this.password.on("focus",function(){
                    $("#password-list").removeClass("hidden")
                    $("#password").addClass("focus")
                    $("#password-warnning").addClass("hidden")
                    $("#password").removeClass("warnning")
                })
                this.password.on("keyup",function(){
                    
                    let s = /(?!^(\d+|[a-zA-Z]+|[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+)$)^[`\w~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;
                    if($("#password").val().length>=8 &&$("#password").val().length <= 16){
                        $("#length").addClass("ok")
                    }else{
                        $("#length").removeClass("ok")
                    }
                    if(!s.exec($("#password").val())){
                        $("#sti").removeClass("ok")
                    }else{
                        $("#sti").addClass("ok")
                    }
                    if($("#password").val().split(" ").length>1){
                        $("#no-sp").removeClass("ok")
                    }else{
                        $("#no-sp").addClass("ok")
                    }
                 })
                
                this.password.on("focusout",function(){
                    $("#password-list").addClass("hidden")
                    if($("#password").val() === ""){
                        $("#password-warnning").removeClass("hidden")
                        $("#password").addClass("warnning")
                    }
                    $("#password").removeClass("focus")
                })
                this.phone.on("focus",function(){
                    $("#duanxin").removeClass("hidden")
                    $("#phoneNum").addClass("focus")
                })
                this.phone.on("focusout",function(){
                    if($("#phoneNum").val()){
                        $("#duanxin").removeClass("hidden")
                    }else{
                        $("#duanxin").addClass("hidden")
                    }
                    $("#phoneNum").removeClass("focus")    
                })
                
                this.sub.on("click",() =>{
                    this.subMit();
                    console.log($.cookie('user'))
                })
            }
            subMit(){
                let name = this.name.val(),
                    password = this.password.val(),
                    phone = this.phone.val(),
                    n = /^1(3|4|5|6|7|8|9)\d{9}$/,
                    s = /(?!^(\d+|[a-zA-Z]+|[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+)$)^[`\w~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]{8,16}$/;
                if(name&&password&&phone){
                    if(!s.exec(password)){
                        alert("密码格式错误")
                        return false;
                    }else{
                        if(password.split(" ").length >1){
                            alert("密码不能包含空格")
                            return false;
                        }else{
                            if(!n.exec(phone)){
                                alert("手机号码错误")
                                return false
                            }else{
                                 if($("input[type='checkbox']").is(':checked')){
                                    console.log(name,password,phone)
                                        $.get('http://localhost/dnf/dist/api/module/select.php',{name,password},function(resp){
                                            let respc = JSON.parse(resp)
                                            if(respc.res_code ===200){
                                                console.log(respc.res_body.list)
                                                let i = 0;
                                                let success = true;
                                                $(respc.res_body.list).each(function (){
                                                    console.log(respc.res_body.list)
                                                    if(respc.res_body.list[i].name == name){
                                                        success = false;
                                                        alert("账号已注册")
                                                        return false;
                                                        
                                                    }else{
                                                        i++; 
                                                    } 
                                                    return success;         
                                                })
                                                if(success){
                                                $.get("http://localhost/dnf/dist/api/module/add.php", {name,password,phone}, (resp) =>{
                                                    let res = JSON.parse(resp);
                                                    if(res.res_code === 200){
                                                    console.log(name,password,phone)
                                                    $.cookie('user',`${name},${password}`,{expires: 7,path:'/'})
                                                    alert("注册成功")
                                                    $(location).attr('href', 'http://localhost:2333');
                                                
                                                   }
                                                })
                                            }
                                        
                                                
                                          }
                                    })
                                }
                            }
                        }
                    }
                }    
            }
        }
        new Signup();
    })
})