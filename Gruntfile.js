module.exports = function (grunt) {

  'use strict';

  // initial grunt configuration
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'config': grunt.file.readJSON('config.json'),
    'clean': {
      build: 'build/*'
    },
    'http-server': {
      dev: {
        root: 'build/demos',
        port: 8000,
        host: '127.0.0.1',
        openBrowser : true
      }
    }
  });

  // load npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-replace');

  // delete `tmp` directory that is created during build process
  grunt.registerTask('delete-tmp-dir', '', function() {
    grunt.file.delete('tmp');
  });

  // grunt default task
  grunt.registerTask('default', '', function() {

    var demos = [],
      concatConfig = {},
      replaceConfig = {},
      categories = grunt.config('config.categories');

    for (var i = 0; i < categories.length; i++) {

      var cat = categories[i];

      grunt.file.recurse('demos/' + cat,
          function callback(abspath, rootdir, subdir, filename) {

        if (filename == 'config.json') {

          var srcDir = 'demos/' + cat + '/' + subdir + '/';
          var buildDir = 'build/' + srcDir + '/';
          var tmpDir = 'tmp/' + srcDir + '/';
          var tmplDir = '_templates/';

          var demoConfig = grunt.file.readJSON(srcDir + filename);

          demoConfig['category'] = cat;
          demoConfig['directory'] = subdir;
          demos.push(demoConfig);

          concatConfig[tmpDir + 'js/build.js'] = srcDir + 'js/*.js';
          if (!grunt.file.exists(tmpDir + 'js/build.js')) {
            grunt.file.write(tmpDir + 'js/build.js', '');
          }

          concatConfig[buildDir + 'css/build.css'] = srcDir + 'css/*.css';
          if (!grunt.file.exists(buildDir + 'css/build.css')) {
            grunt.file.write(buildDir + 'css/build.css', '');
          }

          replaceConfig['default-' + subdir] = {
            options: {
              patterns: [
                {
                  match: 'content',
                  replacement: '<%= grunt.file.read("' + tmplDir + 'single.html") %>'
                },
                {
                  match: 'js',
                  replacement: '\r\r<%= grunt.file.read("' + tmpDir + 'js/build.js") %>\r'
                }
              ],
              variables: {
                'title': demoConfig.title,
                'desc': demoConfig.description,
                'license' : demoConfig.license
              }
            },
            files: [
              {
                expand: true,
                flatten: true,
                src: tmplDir + 'default.html',
                dest: buildDir,
                rename: function(dest, src) {
                  return dest + src.replace('default', 'index');
                }
              }
            ]
          };

          replaceConfig['detail-' + subdir] = {
            options: {
              patterns: [
                {
                  match: 'content',
                  replacement: '<%= grunt.file.read("' + srcDir + 'index.html") %>'
                }
              ]
            },
            files: [
              {
                expand: true,
                flatten: true,
                src: buildDir + 'index.html',
                dest: buildDir
              }
            ]
          };

        }
      });

    }

    demos.sort(function (a, b) {
      var prop = 'directory';
      var sortStatus = 0;
      if (a[prop] < b[prop]) {
        sortStatus = -1;
      } else if (a[prop] > b[prop]) {
        sortStatus = 1;
      }
      return sortStatus;
    });

    var buildDir = 'build/demos/';
    var tmplDir = '_templates/';

    concatConfig['build/demos/index.html'] = [];

    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      concatConfig['build/demos/' + cat + '/index.html'] = [];
    }

    for (var i = 0; i < demos.length; i++) {

      var demo = demos[i];

      var srcDir = 'demos/' + demo.category + '/' + demo.directory + '/';
      var tmpDir = 'tmp/' + srcDir + '/';

      replaceConfig['card-' + demo.directory] = {
        options: {
          variables: {
            'category' : demo.category,
            'title': demo.title,
            'desc': demo.description
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: tmplDir + 'card.html',
            dest: tmpDir
          }
        ]
      };

      concatConfig['build/demos/index.html'].push(tmpDir + 'card.html');
      concatConfig['build/demos/' + demo.category + '/index.html'].push(tmpDir + 'card.html');

    }

    replaceConfig['index-all'] = {
      options: {
        variables: {
          'content' : '<%= grunt.file.read("' + buildDir + 'index.html") %>'
        }
      },
      files: [
        {
          expand: true,
          flatten: true,
          src: tmplDir + 'default.html',
          dest: buildDir,
          rename: function(dest, src) {
            return dest + src.replace('default', 'index');
          }
        }
      ]
    };

    for (var i = 0; i < categories.length; i++) {

      var cat = categories[i];

      replaceConfig['index-' + cat] = {
        options: {
          variables: {
            'content' : '<%= grunt.file.read("' + buildDir + '/' + cat + '/index.html") %>'
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: tmplDir + 'default.html',
            dest: buildDir + '/' + cat + '/',
            rename: function(dest, src) {
              return dest + src.replace('default', 'index');
            }
          }
        ]
      };

    }

    grunt.config.set('concat', {
      build: {
        files: concatConfig
      }
    });

    grunt.config.set('replace', replaceConfig);

    grunt.task.run([
      'clean',
      'concat',
      'replace',
      'delete-tmp-dir'
    ]);

  });

  grunt.registerTask('serve', '', function() {
    grunt.task.run('http-server:dev');
  });

};
