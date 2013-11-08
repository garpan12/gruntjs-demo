// wrapper function for Grunt
module.exports = function(grunt) {

    // initialize the configuration of the Grunt workflow
    grunt.initConfig({
    
        // this is the package file that we are going to use
        pkg: grunt.file.readJSON('package.json'),
 
        // configuring the uglify task
        uglify: {
            dev : {
                files: {"src/js/index.min.js" : "src/js/index.js" }
            }
        },
        
        // configuring the less task
        less: {
            dev : {
                files: {"src/css/bootstrap.css" : "less/bootstrap.less" }
            }
        },

        // configuring the jsHint task
        jshint: {
            all: ['src/js/index.js']

        },
        
            // Create a local web server for testing http:// URIs.
            connect: {
                root_server: {
                    options: {
                        port: 9000,
                        base: '.',
                },
            },
            test_server: {
                options: {
                    port: 9001,
                    base: 'test',
                },
            }
        },

        // Unit tests.
        qunit: {
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
                        'http://localhost:9000/test/qunit1.html',
                        'http://localhost:9001/qunit2.html',
                  ]
                },
            },
            urls_and_files: {
                options: {
                    urls: '<%= qunit.urls.options.urls %>',
                },
                src: 'test/*{1,2}.html',
            },
        }
    });
    
    var successes = {};
    var currentUrl;
    grunt.event.on('qunit.spawn', function(url) {
        currentUrl = url;
        if (!successes[currentUrl]) { successes[currentUrl] = 0; }
    });
    grunt.event.on('qunit.done', function(failed, passed) {
        if (failed === 0 && passed === 2) { successes[currentUrl]++; }
    });

    
    // load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-internal');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    // set the tasks alias
    
    // let default grunt build do all the things in the config
    grunt.registerTask('default', [ 'uglify', 'less', 'unit-test']);
    
    // uglify task

      grunt.registerTask('do-tests', 'Test to see if qunit task actually worked.', function() {
        var assert = require('assert');
        var difflet = require('difflet')({indent: 2, comment: true});
        var actual = successes;
        var expected = {
          'test/qunit1.html': 3,
          'test/qunit2.html': 3,
          'http://localhost:9000/test/qunit1.html': 2,
          'http://localhost:9001/qunit2.html': 2
        };
        try {
          assert.deepEqual(actual, expected, 'Actual should match expected.');
        } catch (err) {
          grunt.log.subhead('Actual should match expected.');
          console.log(difflet.compare(expected, actual));
          throw new Error(err.message);
        }
      });

    
    // QUnit task
    grunt.registerTask('unit-test', ['connect', 'qunit', 'jshint', 'do-tests']);

};
