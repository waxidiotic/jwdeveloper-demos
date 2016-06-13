module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
          files: {
            'dest/feeds_harness.js': ['js/feeds_harness.js']
          }
        },
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>','templates/*.hbs'],
      tasks: ['jshint','uglify','handlebars'],
      options: {
          livereload: true
        }
    },

    express: {
        all: {
          options: {
            port: 9000,
            hostname: "0.0.0.0",
            bases: [__dirname], // Replace with the directory you want the files served from
                                // Make sure you don't use `.` or `..` in the path as Express
                                // is likely to return 403 Forbidden responses if you do
                                // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
            livereload: true
          }
        }
      },

    handlebars: {
      all: {
          files: {
              "dest/templates.js": ["templates/*.hbs"]
          }
        }
    },


    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>/demo.html'
      }
    }
  });

  // Creates the `server` task
  grunt.registerTask('server', [
    'jshint',
    'uglify',
    'handlebars',
    'express',
    'open',
    'watch'
  ]);
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'uglify', 'handlebars']);

};