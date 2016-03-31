module.exports = function (grunt) {

  'use strict';

  var config = {};

  config.pkg = grunt.file.readJSON('package.json');
  config.config = grunt.file.readJSON('config.json');

  config.clean = {
      build: 'build/*'
  };

  config.concat = {};

  config.replace = {};

  config['http-server'] = {
    dev: {
      root: 'build/demos',
      port: 8000,
      host: '127.0.0.1',
      openBrowser : true
    }
  };

  grunt.initConfig(config);

  var dep, deps;
  deps = grunt.config.get('pkg.devDependencies');
  for (dep in deps) {
    if (deps.hasOwnProperty(dep) && /^grunt-/.test(dep)) {
      grunt.loadNpmTasks(dep);
    }
  }

  grunt.registerTask('delete-tmp-dir', '', function() {
    grunt.file.delete('tmp');
  });

  grunt.registerTask('default', '', function() {

    var _concat = {};
    var _replace = {};

    var categories = grunt.config('config.categories');

    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];

      grunt.file.recurse('demos/' + cat,
          function callback(abspath, rootdir, subdir, filename) {

        if (filename == 'config.json') {

          var _src = 'demos/' + cat + '/' + subdir + '/';
          var _build = 'build/' + _src + '/';
          var _tmp = 'tmp/' + _src + '/';
          var _tmpl = '_templates/';

          var config = grunt.file.readJSON(_src + filename);

          _concat[_tmp + 'js/build.js'] = _src + 'js/*.js';
          if (!grunt.file.exists(_tmp + 'js/build.js')) {
            grunt.file.write(_tmp + 'js/build.js', '');
          }

          _concat[_build + 'css/build.css'] = _src + 'css/*.css';
          if (!grunt.file.exists(_build + 'css/build.css')) {
            grunt.file.write(_build + 'css/build.css', '');
          }

          _replace['default-' + subdir] = {
            options: {
              patterns: [
                {
                  match: 'content',
                  replacement: '<%= grunt.file.read("' + _tmpl + 'single.html") %>'
                },
                {
                  match: 'js',
                  replacement: '\r\r<%= grunt.file.read("' + _tmp + 'js/build.js") %>\r'
                }
              ],
              variables: {
                'title': config.title,
                'desc': config.description,
                'license' : config.license
              }
            },
            files: [
              {
                expand: true,
                flatten: true,
                src: _tmpl + 'default.html',
                dest: _build,
                rename: function(dest, src) {
                  return dest + src.replace('default', 'index');
                }
              }
            ]
          };

          _replace['detail-' + subdir] = {
            options: {
              patterns: [
                {
                  match: 'content',
                  replacement: '<%= grunt.file.read("' + _src + 'index.html") %>'
                }
              ]
            },
            files: [
              {
                expand: true,
                flatten: true,
                src: _build + 'index.html',
                dest: _build
              }
            ]
          };

        }
      });

    }

    grunt.config.set('concat', {
      build: {
        files: _concat
      }
    });

    grunt.config.set('replace', _replace);

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
