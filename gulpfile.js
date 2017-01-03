var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant = require('imagemin-pngquant');

gulp.task('sass', function () {
  return gulp.src(['src/sass/*.sass'])
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(cssnano())
    .pipe(gulp.dest('public/css'))
});


// gulp.task('files',function(){
//   return gulp.src(['app/files/*.*'])
//     .pipe(gulp.dest('dist/files'))
// });
// gulp.task('css', ['sass'], function () {
//   return gulp.src(['app/libs/normolize.css', 'app/css/main.css', 'app/css/header.css', 'app/css/slider.css', 'app/css/applications.css', 'app/css/gallary.css', 'app/css/dictionary.css', 'app/css/footer.css'])
//     .pipe(concat('all.css'))
//     .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist/css'))
//     .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('js', function () {
//   return gulp.src(['app/js/main.js', 'app/js/applications.js', 'app/js/dictionary.js','app/js/slider.js'])
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.reload({stream: true}));
// });

gulp.task('hbs', function () {
  return gulp.src(['src/views/*'])
    .pipe(concat('index.hbs'))
    .pipe(gulp.dest('public/views'))
});

gulp.task('main-hbs', function () {
  return gulp.src(['src/views/layouts/*'])
    .pipe(gulp.dest('public/views/layouts'))
});
// gulp.task('img', function(){
//   return gulp.src('app/img/*.*')
//   .pipe(imagemin({
//     interplaced:true,
//     progressive: true,
//     svgPlugins: [{removeViewBox: false}],
//     use: [pngquant()]
//   }))
//   .pipe(gulp.dest('dist/img'));
// });
// gulp.task('clean', function () {
//   return del.sync('dist');
// });
// gulp.task('browser-sync', function () { // Создаем таск browser-sync
//   browserSync({ // Выполняем browserSync
//     server: { // Определяем параметры сервера
//       baseDir: 'dist' // Директория для сервера - app
//     },
//     notify: false // Отключаем уведомления
//   });
// });

gulp.task('build', ['hbs','main-hbs', 'sass']);

gulp.task('watch', ['build'], function () {
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('views/*/*', ['hbs']);

});
gulp.task('default', ['watch']);