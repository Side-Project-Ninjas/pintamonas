"use strict";

var gulp = require("gulp-help")(require("gulp"));

var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var concat = require("gulp-concat");
var eslint = require("gulp-eslint");
var jade = require("gulp-jade");
var ngAnnotate = require("gulp-ng-annotate");
var nodemon = require("gulp-nodemon");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var vendor = require("gulp-concat-vendor");
var debug = require("gulp-debug");

var config = {
  server: {
    url: "localhost",
    // port: 3000,
    proxy: 8080
  },
  paths: {
    server: "./src/server/index.js",
    styles: {
      src: ["./src/client/resources/styles/**/*.scss"],
      public: "./public/resources/css/",
      map: "./"
    },
    scripts: {
      src: ["./src/client/**/*.js", "!./src/client/vendor/**/*.js"],
      public: "./public/resources/js/",
      map: "./"
    },
    templates: {
      src: ["./src/client/**/*.jade"],
      public: "./public/"
    },
    vendor: {
      src: ["./src/client/vendor/jQuery", "./src/client/vendor/*"],
      public: "./public/resources/vendor"
    }
  }
};


gulp.task("serve", "Sirve la aplicación", ["compile", "nodemon"], function() {

  browserSync.init({
    ghostMode: false,
    proxy: {
      target: "http://localhost:3000",
      ws: true
    },
    port: config.server.proxy
  });

  gulp.watch(config.paths.templates.src, ["html"]);
  gulp.watch(config.paths.styles.src, ["css"]);
  gulp.watch(config.paths.scripts.src, ["js"]);
  gulp.watch(config.paths.vendor.src, ["vendor"]);
});

gulp.task("compile", "Compila los ficheros HTML, CSS y JS", ["html", "css", "js", "vendor"]);

gulp.task("nodemon", "Inicia el servidor y lo reinicia si se producen cambios", function() {
  // nodemon({
  //   script: config.paths.server,
  //   debug: true,
  //   watch: ".\\src\\server\\",
  //   env: {
  //     "NODE_ENV": "development"
  //   }
  // });
});

gulp.task("html", "Compila HTML con los ficheros JADE", function() {
  return gulp.src(config.paths.templates.src)
    .pipe(debug({
      title: "HTML"
    }))
    .pipe(jade())
    .pipe(gulp.dest(config.paths.templates.public))
    .pipe(browserSync.stream());
});

gulp.task("css", "Genera app.css con los ficheros SCSS", function() {
  return gulp.src(config.paths.styles.src)
    .pipe(debug({
      title: "CSS"
    }))
    .pipe(concat("app.css"))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(config.paths.styles.map))
    .pipe(gulp.dest(config.paths.styles.public))
    .pipe(browserSync.stream());
  //.pipe(browserSync.stream());
});

gulp.task("js", "Genera app.js con los ficheros JS", function() {
  return gulp.src(config.paths.scripts.src)
    .pipe(debug({
      title: "JS"
    }))
    .pipe(ngAnnotate())
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write(config.paths.scripts.map))
    //.pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(config.paths.scripts.public))
    .pipe(browserSync.stream());
});

gulp.task("vendor", "Genera un vendor.js a partir de las dependencias de bower", function() {
  gulp.src(config.paths.vendor.src)
    .pipe(debug({
      title: "VENDOR"
    }))
    .pipe(vendor("vendor.js"))
    .pipe(gulp.dest(config.paths.vendor.public))
    .pipe(browserSync.stream());
});
