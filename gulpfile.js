const { task, watch, dest, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

const serve = (cb) => {
  browserSync.init({ server: { baseDir: "./" } });
  build();
  cb();
}

const build = (cb) => {
  const bundler = browserify('./index.js', { debug: true }).transform(babel, {"presets": ["@babel/preset-env", "@babel/preset-react"]});
  bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('chatbot.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist'));
  cb && cb()
}

const watchFiles = (cb) => {
  watch(['./index.html', './index.js']).on('change', (path, stats) => {
    build(browserSync.reload);
    console.log(`File ${path} was changed`);
  });
  cb && cb();
}

task(serve);
task(build);
task(watchFiles);
task('default', series(['serve', 'build', 'watchFiles']));
