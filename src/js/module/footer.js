define(['jquery'], () => {
    class Footer{
        constructor(){
            this.container = $('footer')
            this.readyload()
        }

            readyload () { 
               this.container.load('/html/module/footer.html') 
        } 
      }
    new Footer();
})