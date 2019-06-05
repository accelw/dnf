require(['./config'],() =>{
    require(['template','header','footer'], (template,header) =>{
        class Detail{
            constructor(){
                this.detailInit()
            }
            detailInit(){
            }
        }
        new Detail();
    })
})