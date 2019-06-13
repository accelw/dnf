require.config({
    baseUrl: '/',
    paths:{
        jquery : 'libs/jquery-3.2.1',
        header : 'js/module/header',
        footer : 'js/module/footer',
        template : 'libs/template-web',
        swiper:'libs/swiper/dist/js/swiper.min',
        url:'js/module/url',
        cookie:'libs/jquery.cookie'
    },
    shim:{
        cookie:{
            deps:['jquery']
        }
    }
})