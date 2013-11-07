module.exports = function(grunt) {
    // set up grunt
    grunt.initConfig({
        jshint: {
            src:['Gruntfile.js', 'src/config.js'],
            option: {
                curly: true,
                

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', 'lint');
};
