

module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
	options: {
	  reporter: 'spec'
	},
	src: 'test/**/*.js'
      }
    }
  });

  // load grunt-modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // custom tasks
  grunt.registerTask('test', ['mochaTest']);
};
