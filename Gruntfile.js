// wrapper function for Grunt
module.exports = function(grunt) {

    // initialize the configuration of the Grunt workflow
    grunt.initConfig({
    
        // this is the package file that we are going to use
        pkg: grunt.file.readJSON('package.json'),
        
        // creating the uglify task
        uglify: {
            // override the default options
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyy-mm-dd") %> */\n'
            },
            
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        
        qunit: {
            // location of the test runner files
            all_tests: ['test/*{1,2}.html'],
            individual_tests: {
                files: [
                    {src: 'test/*1.html'},
                    {src: 'test/*{1,2}.html'},
                ]
            },
            urls: {
                options: {
                    urls: [
                        'http://localhost:9000/test/test1.html',
                        'http://localhost:9001/test2.html',
                    ]
                },
            },
            urls_and_files: {
                options: {
                    urls: '<%= qunit,urls.options.urls %>',
                },
                src: 'test/*{1,2}.html',
            },
        },
        
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        
        // create task to start a local web server
        connect: {
            root_server: {
                options: {
                    por: 9000,
                    base: '.',
                },
            },
            test_server: {
                options: {
                    port: 9001,
                    base: 'test',
                },
            }
        }
    });
    
    var sucesses = {};
    var currentUrl;
    grunt.event.on('qunit.span', function(url) {
        currentUrl = url;
        if(!sucesses[currentUrl]) { sucesses[currentUrl] = 0; }
    });
    grunt.event.on('qunit.done', function(failed, passed) {
        if(failed === 0 && passed === 2) { successes[currentUrl]++; }
    });
    
    // load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-internal');
    
    // set the tasks alias
    
    // let default grunt build do all the things in the config
    grunt.registerTask('default', ['qunit', 'uglify']);
    // uglify task
    grunt.registerTask('uglify', 'uglify', function() {
        grunt.log.write('Uglifying the project...').ok();
    });

    grunt.registerTask('do-tests', 'check if tests worked', function() {
        grunt.log.write('Checking the QUnit tests...\n');
        
        var assert = require('assert');
        //var difflet = require('difflet')({indent: 2, comment: true});
        var actual = sucesses;
        var expected = {
          'test/test1.html': 3,
          'test/test2.html': 3,
          'http://localhost:9000/test/test1.html': 2,
          'http://localhost:9001/test2.html': 2
        };
        try {
          assert.deepEqual(actual, expected, 'Actual should match expected.');
        }
        catch(err) {
          grunt.log.subhead('Actual should match expected.');
          //console.log(difflet.compare(expected, actual));
          throw new Error(err.message);
        }
       
    });
    
    // QUnit task
    grunt.registerTask('qunit', ['connect', 'qunit', 'do-tests']);
        
    // JSHint task
    grunt.registerTask('jshint', 'jshint', function() {
        grunt.log.write('Validating against JSHint...').ok();
    });

};
