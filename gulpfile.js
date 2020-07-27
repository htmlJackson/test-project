const gulp = require("gulp");
const sass = require("gulp-sass");
const path = require("path");
const plumber = require("gulp-plumber");
const server = require("browser-sync");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");

gulp.task("sass", function () {
  return gulp.src("./sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./"))
    .pipe(server.stream());
});

gulp.task("default", ["sass"], function() {
  server.init({
    server: "."
  });

  gulp.watch("sass/*.scss", ["sass"]);
  gulp.watch("*.html")
  .on("change", server.reload);
});
