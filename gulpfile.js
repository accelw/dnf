const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      cleanCss = require('gulp-clean-css'),
      gulpSass = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      babel = require("gulp-babel"),
      connect = require('gulp-connect');

gulp.task('css',() =>{
    gulp.src('src/css/*.scss')
        .pipe(gulpSass())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css')) 
        .pipe(connect.reload());
})

gulp.task('html',()=>{
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

gulp.task('js',() =>{
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})
gulp.task('api',()=>{
    gulp.src('src/api/**/*.php')
        .pipe(gulp.dest('dist/api'))
        .pipe(connect.reload());
})
gulp.task('libs',() =>{
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
        .pipe(connect.reload());
})

gulp.task('imgs',() =>{
    gulp.src('src/imgs/**/*')
        .pipe(gulp.dest('dist/imgs'))
        .pipe(connect.reload());
})

gulp.task('server',() =>{
    connect.server({
        root:"dist",
        port:2333,
        livereload:true
    });
})

gulp.task('watch',() =>{
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/css/*.scss',['css']);
    gulp.watch('src/imgs/**/*',['imgs']);
    gulp.watch('src/api/**/*.php',['api']);
})

gulp.task('default',['html','css','js','api','libs','imgs','server','watch']);