require(['./config'],() =>{
    require(['cookie','header','footer'], (cookie) =>{
        class Login{
            constructor(){
                
                this.log = $("#log")
                this.init();
            }
            init(){
                
                this.log.on("click",function(){
                  let name = $("#inputName3").val(),
                      password = $("#inputPassword3").val();
                      console.log(name)
                       $.get('http://localhost/dnf/dist/api/module/select.php',{name,password},function(resp){
                       let res = JSON.parse(resp);
                       if(res.res_code === 200){
                       console.log(res.res_body.list[0]);
                       if(res.res_body.list[0]){

                        if(res.res_body.list[0].name === name&&res.res_body.list[0].password === password){
                            $.cookie("user",`${name},${password}`,{expires: 7,path:'/'})
                            $(location).attr('href', 'http://localhost:2333');
                            }
                        }else{
                            alert("账号或密码错误")
                        }
                      }
                   })
                })
            }
        }
        new Login();
    })
})