// wrapper function for Grunt
module.exports = function(grunt) {

    // initialize the configuration of the Grunt workflow
    grunt.initConfig({
    
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
        
        }
    });
    
    // load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // set the tasks alias
    
    // let default grunt build do all the things in the config
    grunt.registerTask('default', ['uglify']);
    // uglify task
    grunt.registerTask('uglify', 'uglify', function() {
        grunt.log.write('Uglifying the project...').ok();
    });
    // jasmine task
    grunt.registerTask('jasmine', 'jasmine', function() {
        grunt.log.write('Checking the Jasmine tests...').ok();
    });
};
