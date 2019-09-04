const gulp = require('gulp'),
    sass = require('gulp-sass'),
    bs = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task('css-libs', function () {
    return gulp.src('src/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css'))
});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.+(sass|scss)')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task('js-libs', function () {
    return gulp.src([
            'src/libs/jquery/dist/jquery.min.js',
            'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
});

gulp.task('bs', function () {
    bs({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', async function () {
    return del.sync('dist')
});

gulp.task('prebuild', async function () {
    const buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    const buildCss = gulp.src([
            'src/css/main.css',
            'src/css/libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'));

    const buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));

    const buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('clear', function () {
    return cache.clearAll()
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(sass|scss)', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch(['src/js/common.js', 'app/libs/**/*.js'], gulp.parallel('js-libs'));
});

gulp.task('default', gulp.parallel('css-libs', 'sass', 'js-libs', 'bs', 'watch'));
gulp.task('build', gulp.parallel('clean', 'prebuild', 'img'));