var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect= require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var  babel = require("gulp-babel");


gulp.task("copy-index",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload())
});


gulp.task("copy-img",function(){
	gulp.src("img/**")
	.pipe(gulp.dest("dist/img"))

});



gulp.task("sass",function(){
	gulp.src("css/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
});
//gulp.task('concat',function(){ 
//	gulp.src('js/*.js')
//	.pipe(babel({"presets":["es2015"]}))
//	.pipe(uglify())
//	.pipe(gulp.dest('dist/js')) 
//	.pipe(connect.reload())
//})
gulp.task('concat',function(){ 
	gulp.src('js/*.js')
//	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js')) 
	.pipe(connect.reload())
})
 gulp.task("watch",function(){
	gulp.watch("*.html",["copy-index"]);
	gulp.watch("img/**",["copy-img"]);
	gulp.watch("css/*.scss",["sass"]);
	gulp.watch("js/*.js",["concat"]);

});    
      
 gulp.task('sever',function(){ 
	connect.server({
		"root":'dist',
		"livereload":true 
		});
})    
      
 gulp.task('default',['sever','watch'])