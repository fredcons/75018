'use strict';

module.exports = function (grunt) {

	require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    

    grunt.initConfig({

      source: 'app',
      target: 'dist',	

      // copy: {
      //   build: {
      //     cwd: '<%= source %>',
      //     src: [ 'styles/css/**', 'scripts/**', '**/*.html' ],
      //     dest: '<%= target %>',
      //     expand: true
      //   },
      // },

      

      clean: {
        build: {
          src: [ '<%= target %>', '.tmp/styles/**' ]
        },
      }, 

      compass: {
            options: {
                sassDir: '<%= source %>/styles/sass',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= source %>/images',
                javascriptsDir: '<%= source %>/scripts',
                fontsDir: '<%= source %>/styles/fonts',
                importPath: '<%= source %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= target %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

      // compass: {                  
      //   dist: {                   
      //     options: {              
      //       sassDir: '<%= source %>/styles/sass',
      //       cssDir: '<%= source %>/styles/css',
      //       environment: 'production',
      //       outputStyle: 'expanded'
      //     }
      //   }
      // },

      copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>',
                    dest: '<%= target %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'scripts/{,*/}*.js',
                        'web.js',
                        '.htaccess',
                        //'images/{,*/}*.{webp,gif}',
                        'images/**',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '.tmp/styles/',
                dest: '<%= target %>/styles',
                src: '{,*/}*.css'
            },
            bower: {
            	expand: true,
                dot: true,
                cwd: '<%= source %>/bower_components',
                dest: '<%= target %>/bower_components',
                src: '*'
            },
            modules: {
                expand: true,
                dot: true,
                cwd: 'node_modules',
                dest: '<%= target %>/node_modules',
                src: '*'
            },
            npm: {
              expand: true,
                dot: true,
                cwd: '',
                dest: '<%= target %>/',
                src: 'package.json'
            },
            heroku: {
                expand: true,
                dot: true,
                cwd: '',
                dest: '<%= target %>/',
                src: 'Procfile'
            }
        },

      watch: {
		  stylesheets: {
		    files: '<%= source %>/**/*.scss',
		    tasks: [ 'compass:server', 'copy:styles' ]
		  },
		  // scripts: {
		  //   files: '<%= source %>/**/*.js',
		  //   tasks: [ 'scripts' ]
		  // },
		  
		  copy: {
		    files: [ '<%= source %>/**', '!<%= source %>/**/*.scss', '!<%= source %>/**/*.js' ],
		    tasks: [ 'copy' ]
		  },
		  livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= source %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= source %>}/scripts/{,*/}*.js',
                    '<%= source %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
	  },

	  connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= source %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%= source %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= target %>'
                }
            }
        }

	  

    });	

    grunt.registerTask(
      'build', 
      'Compiles all of the assets and copies the files to the build directory.', 
      [ 
        'clean', 
        'compass',
        'copy' 
      ]
    );

    grunt.registerTask(
      'server', 
      'Compiles the app, launches a server, and watches files.', 
      [ 
        'build', 
        'connect:livereload',
        'watch' 
      ]
    );

    grunt.registerTask('heroku:production', ['build']);

};	
