module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buildFolder: 'build',
    stylesFolder: 'styles',

    clean: ['<%= buildFolder %>'],

    stylus: {
      compile: {
        options: {
          paths: ['<%= stylesFolder %>', 'node_modules'],
          use: [
            require('axis-css')
          ],
        },
        files: {
          '<%= buildFolder %>/<%= stylesFolder %>/main.css': '<%= stylesFolder %>/main.styl'
        }
      }
    },

    browserify: {
      common: {
        options: {
          debug: true,
          externalize: [
            'lib/vendor/**/*',
            'lib/common/**/*'
          ]
        },
        src: [
          'lib/vendor/**/*',
          'lib/common/**/*'
        ],
        dest: '<%= buildFolder %>/scripts/common.js',
      },
      index: {
        src: 'lib/index.js',
        dest: '<%= buildFolder %>/scripts/index.js',
        options: {
          debug: true,
          external: [ 'lib/vendor/**/*', 'lib/common/**/*' ],
          transform: ['coffeeify', 'liveify', 'hbsfy']
        },
      }
    },

    jshint: {
      options: { jshintrc: '.jshintrc' },
      all: [ 'Gruntfile.js', 'lib/**/*.js', 'test/**/*.js' ]
    },

    assemble: {
      options: {
        assets: 'assets',
        data: 'content/**/*.{json,yml}',
        partials: [
          'content/**/*.hbs'
        ],

        // Load helpers for all the application
        registerFunctions: function(engine) {
          var helpers = require('./content/templates/helpers/template-helpers');
          engine.engine.registerFunctions(helpers);
        }
      },

      markdown: {
        options: {
          layout: 'content/templates/layouts/default.md.hbs'
        },
        files: [
          {
            expand: true,
            cwd: 'content/pages',
            src: ['**/*.md.hbs'],
            dest: '<%= buildFolder %>/',
            rename: function(dest, src) {
              return (dest + src).replace('.md', '')
            }
          }
        ]
      },

      pages: {
        options: {
          layout: 'content/templates/layouts/default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: 'content/pages',
            src: ['*.hbs', '!**/*.md.hbs'],
            dest: '<%= buildFolder %>/'
          },
        ]
      },

    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '<%= buildFolder %>',
          keepalive: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: '<%= stylesFolder %>/**/*.styl',
        tasks: ['stylus']
      },
      scripts: {
        files: 'lib/**/*',
        tasks: ['jshint', 'browserify']
      },
      content: {
        files: 'content/**/*',
        tasks: ['assemble']
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('assemble')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', [
    'clean', 'stylus', 'jshint', 'browserify', 'assemble'
  ])

  grunt.registerTask('preview', ['default', 'connect'])

}
