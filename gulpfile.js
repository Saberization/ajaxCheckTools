const gulp = require('gulp')
const gulpBabel = require('gulp-babel')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

gulp.task('babel', () => {
  return gulp.src(['./js/*.js'])
    .pipe(gulpBabel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
  return gulp.src('dist')
    .pipe(clean())
})

gulp.task('default', gulp.series('clean', 'babel'))