var gulp = require("gulp"),
    gutil = require("gulp-util"),
    browserify = require("gulp-browserify");

gulp.task("scripts", function() {
  gulp.src("src/git.js")
      .pipe(browserify())
      .pipe(gulp.dest("build"));
});

gulp.task("default", function() {
  gulp.run("scripts");

  gulp.watch("src/**", function(event) {
    gulp.run("scripts");
  })
});