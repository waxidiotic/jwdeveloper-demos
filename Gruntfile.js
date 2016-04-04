module.exports = function (grunt) {

  'use strict';

  // initial grunt configuration
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'config': grunt.file.readJSON('config.json'),
    'clean': {
      build: ['build/*']
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
  grunt.loadNpmTasks('grunt-preprocess');

  // grunt default task
  grunt.registerTask('default', '', function() {

    if (grunt.file.isDir('tmp')) grunt.file.delete('tmp');

    const SRC = 'demos/';
    const BUILD = 'build/';
    const TMP = 'tmp/';
    const TMPL = '_templates/';

    var categories = grunt.config('config.categories'),
      demos = [],
      concatJS = {},
      concatCSS = {},
      concatIndexes = {},
      preprocess = {},
      tasks = [
        'clean',
        'concat:js',
        'concat:css'
      ];

    for (var i = 0; i < categories.length; i++) {

      var cat = categories[i];

      // if directory does not exist even despite being in category list
      if (!grunt.file.isDir('demos/' + cat)) continue;

      grunt.file.recurse('demos/' + cat,
          function callback(abspath, rootdir, subdir, filename) {

        // we are looking for a config file, which is require per demo
        // when we find the config file, we process that directory as a demo
        if (filename == 'config.json') {

          // define demo-specific directory shortcuts
          var srcDir = SRC + cat + '/' + subdir + '/';
          var buildDir = BUILD + srcDir;
          var tmpDir = TMP + srcDir;

          // get demo config json
          var demo = grunt.file.readJSON(srcDir + filename);

          // append demo obj with demo category and directory
          // then push demo to demos list to iterate over later
          demo['category'] = cat;
          demo['directory'] = subdir;
          demos.push(demo);

          // concat config for demo js
          grunt.file.write(tmpDir + 'js/build.js', '');
          concatJS[tmpDir + 'js/build.js'] = srcDir + 'js/*.js'

          // concat config for demo css
          grunt.file.write(buildDir + 'css/build.css', '');
          concatCSS[buildDir + 'css/build.css'] = srcDir + 'css/*.css';

          // preprocess config fir demo detail page
          preprocess['detail-' + subdir] = {
            options: {
              context: {
                default: '<%= grunt.file.read("' + TMPL + 'single.html") %>',
                single: '<%= grunt.file.read("' + srcDir + 'index.html") %>',
                js: '\r\r<%= grunt.file.read("' + tmpDir + 'js/build.js") %>\r',
                category: demo.category,
                directory: demo.directory,
                title: demo.title,
                desc: demo.description,
                license: demo.license
              }
            },
            files: [
              {
                src: TMPL + 'card.html',
                dest: tmpDir + 'card.html'
              },
              {
                src: TMPL + 'default.html',
                dest: buildDir + 'index.html'
              },
              {
                src: buildDir + 'index.html',
                dest: buildDir + 'index.html'
              }
            ]
          };

          tasks.push('preprocess:detail-' + subdir);

        }

      });

    }

    // sort all demos alphabetically
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

    // add concat config namespaces for index pages
    grunt.file.write(TMP + SRC + 'index.html', '');
    concatIndexes[TMP + SRC + 'index.html'] = [];
    for (var i = 0; i < categories.length; i++) {
      grunt.file.write(TMP + SRC + categories[i] + '/index.html', '');
      concatIndexes[TMP + SRC + categories[i] + '/index.html'] = [];
    }

    // loop demos and add them to concat src file list config for full index
    // and category index it belongs to
    for (var i = 0; i < demos.length; i++) {
      var demo = demos[i];
      concatIndexes[TMP + SRC + 'index.html'].push(
        TMP + SRC + demo.category + '/' + demo.directory + '/card.html');
      concatIndexes[TMP + SRC + demo.category + '/index.html'].push(
        TMP + SRC + demo.category + '/' + demo.directory + '/card.html');
    }

    // add to task list
    tasks.push('concat:indexes');

    // preprocess config for full index page
    preprocess['index-all'] = {
      options: {
        context: {
          indexContent: '<%= grunt.file.read("' + TMP + SRC + 'index.html") %>',
        }
      },
      files: [{
        src: TMPL + 'index.html',
        dest: BUILD + SRC + 'index.html'
      }]
    };

    // add task to list
    tasks.push('preprocess:index-all');

    // preprocess config for each category index page
    for (var i = 0; i < categories.length; i++) {

      // define preprocess config
      preprocess['index-' + categories[i]] = {
        options: {
          context: {
            indexContent: '<%= grunt.file.read("' + TMP + SRC + categories[i] + '/index.html") %>',
            selected: categories[i]
          }
        },
        files: [{
          src: TMPL + 'index.html',
          dest: BUILD + SRC + categories[i] + '/index.html'
        }]
      };

      // add task to list
      tasks.push('preprocess:index-' + categories[i]);

    }

    // set concat config
    grunt.config.set('concat', {
      js: {
        files: concatJS
      },
      css: {
        files: concatCSS
      },
      indexes: {
        files: concatIndexes
      }
    });

    // set preprocess config
    grunt.config.set('preprocess', preprocess);

    // run the task list
    grunt.task.run(tasks);

  });

  // build and serve locally
  grunt.registerTask('serve', '', function() {
    grunt.task.run('default');
    grunt.task.run('http-server');
  });

};
