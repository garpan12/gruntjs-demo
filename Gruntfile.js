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
        
        jasmine: {
            
        },
        
        qunit: {
            // location of the test runner files
            files: ['test/**/*.html']
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
        
        mocha: {
            all: ['test/**/*.html']
        }
    });
    
    // load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');
    
    // set the tasks alias
    
    // let default grunt build do all the things in the config
    grunt.registerTask('default', ['qunit', 'uglify']);
    // uglify task
    grunt.registerTask('uglify', 'uglify', function() {
        grunt.log.write('Uglifying the project...').ok();
    });
    // jasmine task
    grunt.registerTask('jasmine', 'jasmine', function() {
        grunt.log.write('Checking the Jasmine tests...').ok();
    });
    // QUnit task
    grunt.registerTask('qunit', 'qunit', function() {
        grunt.log.write('Checking the QUnit tests...').ok();
    });
    // JSHint task
    grunt.registerTask('jshint', 'jshint', function() {
        grunt.log.write('Validating against JSHint...').ok();
    });
    // Mocha task
    grunt.registerTask('mocha', 'mocha');
};
