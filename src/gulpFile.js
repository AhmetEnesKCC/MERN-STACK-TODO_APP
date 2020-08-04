const gulp = require("gulp");
const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const autoPrefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

sass.compiler = require("node-sass");

gulp.task("sass", async () => {
  gulp
    .src("./Styles/SCSS/**/main.scss")
    .pipe(
      sass().on("error", (error) => {
        console.log(error);
        this.emit("end");
      })
    )
    .pipe(autoPrefixer())
    .pipe(sourcemaps.write("."))
    .pipe(minifyCss())
    .pipe(gulp.dest("./Styles/CSS"));
});

gulp.task("watch:sass", () => {
  gulp.watch("./Styles/SCSS/**/*.scss", gulp.series("sass"));
});
