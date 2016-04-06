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
        openBrowser: true
      }
    }
  });

  // load npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-mustache-render');

  // grunt default task
  grunt.registerTask('default', '', function() {

    // config vars
    var categories = grunt.config('config.categories'),
      demos = {
        'all': []
      },
      concat = {},
      mustacheRender = [],
      paths = {
        root: '/',
        css: 'developer.jwplayer.com/css',
        js: 'developer.jwplayer.com/js',
        img: 'developer.jwplayer.com/img'
      };

    // if `--dev-mode` option was passed to override configurable data,
    // require a `local-config.json` file, otherwise it does nothing
    if (grunt.option('dev-mode') && grunt.file.exists('local-config.json')) {
      var local = grunt.file.readJSON('local-config.json');
      paths.root = local.paths.root || paths.root;
      paths.css = local.paths.css || paths.css;
      paths.js = local.paths.js || paths.js;
      paths.img = local.paths.img || paths.img;
      var openBrowser = grunt.config('http-server.dev.openBrowser');
      if (typeof local.server.openBrowser !== 'undefined') {
        openBrowser = local.server.openBrowser;
      }
      grunt.config('http-server.dev.openBrowser', openBrowser);
    }

    // if `--prod` option was passed to specify build type
    if (grunt.option('prod')) paths.root = '/jw-player/demos/'

    // sort array/object alphabetically on the `directory` property
    function sortABC(a, b) {
      var prop = 'directory';
      var sortStatus = 0;
      if (a[prop] < b[prop]) {
        sortStatus = -1;
      } else if (a[prop] > b[prop]) {
        sortStatus = 1;
      }
      return sortStatus;
    }

    // loop categories and compile index and single pages for each child demo
    for (var i = 0; i < categories.length; i++) {

      // store category data in namespace
      var cat = categories[i];

      // namespace for category demo list
      demos[cat.directory] = [];

      // if directory does not exist even despite being in category list
      if (!grunt.file.isDir('demos/' + cat.directory)) continue;

      // scan category sub-directories to locate valid demos
      grunt.file.recurse('demos/' + cat.directory,
          function callback(abspath, rootdir, subdir, filename) {

        // we are looking for a config file, which is require per demo
        // when we find the config file, we process that directory as a demo
        if (filename == 'config.json') {

          // define demo-specific directory shortcuts
          var srcDir = 'demos/' + cat.directory + '/' + subdir + '/';
          var buildDir = 'build/' + srcDir;

          // get demo config json
          var demo = grunt.file.readJSON(srcDir + filename);

          // append demo obj with demo category and directory
          demo['category'] = cat.directory;
          demo['directory'] = subdir;

          // push demo data to both category and master demo list
          demos[cat.directory].push(demo);
          demos['all'].push(demo);

          // concat config for demo js
          grunt.file.write(buildDir + 'js/build.js', '');
          concat[buildDir + 'js/build.js'] = srcDir + 'js/*.js'

          // concat config for demo css
          grunt.file.write(buildDir + 'css/build.css', '');
          concat[buildDir + 'css/build.css'] = srcDir + 'css/*.css';

          // mustache config for demo detail page
          mustacheRender.push({
            data: {
              paths: paths,
              html: '<%= grunt.file.read("' + srcDir + 'index.html") %>',
              js: '\r\r<%= grunt.file.read("' + buildDir + 'js/build.js") %>\r',
              css: buildDir + 'css/build.css',
              category: demo.category,
              directory: demo.directory,
              title: demo.title,
              description: demo.description,
              license: demo.license,
              showCode: function() {
                return typeof demo.showCode !== 'undefined' ? demo.showCode : true;
              },
              horizontal: function() {
                return typeof demo.layout === 'undefined' || demo.layout == 'horizontal';
              },
              vertical: function() {
                return typeof demo.layout !== 'undefined' && demo.layout == 'vertical';
              }
            },
            template: '_templates/single.mustache',
            dest: buildDir + 'index.html'
          });

        }

      });

      // sort demos within this category
      demos[cat.directory].sort(sortABC);

      // mustache config for category demo index
      mustacheRender.push({
        data: {
          paths: paths,
          name: cat.name,
          directory: cat.directory,
          demos: demos[cat.directory]
        },
        template: '_templates/index.mustache',
        dest: 'build/demos/' + cat.directory + '/index.html'
      });

    }

    // sort complete list of demos
    demos.all.sort(sortABC);

    // mustache config for complete demo index
    mustacheRender.push({
      data: {
        paths: paths,
        name: 'All',
        directory: '',
        demos: demos.all
      },
      template: '_templates/index.mustache',
      dest: 'build/demos/index.html'
    });

    // set concat config
    grunt.config('concat', {
      build: {
        files: concat
      }
    });

    // set mustache config
    grunt.config('mustache_render', {
      options: {
        directory: '_templates'
      },
      build: {
        files: mustacheRender
      }
    });

    // run the task list
    grunt.task.run([
      'clean',
      'concat',
      'mustache_render'
    ]);

  });

  // build and serve locally
  grunt.registerTask('serve', '', [
    'default',
    'http-server'
  ]);

};
