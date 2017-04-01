module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var jsFiles = grunt.file.expand('src/es6/*.js');
  var htmlFiles = grunt.file.expand('src/*.html');
  var htmlminFiles = {};
  var uglifyOptions = {};
  var rollupOptions = {};
  var babelOptions = {};

  htmlFiles.forEach(function(file) {
    var filename = file.split('/').pop();
    htmlminFiles['build/' + filename] = 'build/' + filename;
  });

  jsFiles.forEach(function(file) {
    var filename = file.split('/').pop();
    var uglifyFiles = {};
    var rollupFiles = {};

    uglifyFiles['build/js/' + filename] = ['build/js/' + filename];
    rollupFiles['src/js/'+filename] = ['src/es6/'+filename];
    babelOptions['build/js/' + filename] = 'build/js/' + filename;

    uglifyOptions[filename.replace('.js', '')] = {
      options: {
        ASCIIOnly: true,
        compress: {
          unused: true,
          unsafe: true
        }
      },
      files: uglifyFiles
    };

    rollupOptions[filename] = {
      files: rollupFiles,
      options: {
        format: 'iife',
        exports: 'none'
      }
    };
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build', 'src/css', 'src/js', '*.zip'],

    jshint: {
      all: ['Gruntfile.js', 'es6/**/*.js', 'js/**/*.js']
    },

    csslint: {
      all: ['sass/**/*.css', 'css/**/*.css']
    },

    sass: {
      build: {
        options: {
          noCache: true,
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: '*.scss',
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },

    rollup: rollupOptions,

    watch: {
      scripts: {
        files: ['src/es6/*.js', 'src/es6/modules/**/*.js', '../common/es6/**/*.js', 'Gruntfile.js'],
        tasks: ['jshint', 'rollup', 'copy:js']
      },
      styles: {
        files: ['src/sass/**/*.scss'],
        tasks: ['csslint', 'sass', 'copy:css']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html']
      },
      json: {
        files: ['src/**/*.json'],
        tasks: ['copy:json']
      }
    },

    uglify: uglifyOptions,

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: '**/*.css',
          dest: 'build/css'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*.{png,jpg,gif,ico}'],
          dest: 'build/'
        }]
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: htmlminFiles
      }
    },

    copy: {
      release: {
        expand: true,
        cwd: 'src',
        src: ['./**/*', '!./es6/**', '!./sass/**'],
        dest: 'build'
      },
      css: {
        expand: true,
        cwd: 'src',
        src: ['./**/*.css'],
        dest: 'build'
      },
      js: {
        expand: true,
        cwd: 'src',
        src: ['./js/**/*.js'],
        dest: 'build'
      },
      html: {
        expand: true,
        cwd: 'src',
        src: ['./*.html'],
        dest: 'build'
      },
      json: {
        expand: true,
        cwd: 'src',
        src: ['*.json', '_locales/**/*.json'],
        dest: 'build'
      },
      pem: {
        src: '<%= pkg.name %>.pem',
        dest: 'build/key.pem'
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: babelOptions
      }
    },

    replace: {
      debug: {
        src: ['build/js/*.js', 'build/*.html'],
        overwrite: true,
        replacements: [{
          from: /\/\*debug-start\*\/[^*]*\/\*debug-end\*\//g,
          to: ''
        }, {
          from: /<!--debug-start-->[^!]*<!--debug-en-->/g,
          to: ''
        }, {
          from: /__IS_DEBUG_MODE__ = true;/g,
          to: '__IS_DEBUG_MODE__ = false;'
        }]
      }
    }
  });

  grunt.registerTask('default', ['clean', 'rollup', 'sass', 'copy:release', 'watch']);
  grunt.registerTask('release', function() {
    grunt.task.run([
      'clean',
      'csslint',
      'jshint',
      'rollup',
      'sass',
      'copy:release',
      'babel',
      'replace',

      'htmlmin',
      'uglify',
      'cssmin'
    ]);
  });
  grunt.registerTask('debug', function() {
    grunt.task.run([
      'clean',
      'csslint',
      'jshint',
      'rollup',
      'sass',
      'copy:release',
      'babel'
    ]);
  });
};