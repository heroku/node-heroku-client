module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        atBegin: true
      },
      files: ['lib/**/*.js', 'spec/**/*.js'],
      tasks: 'shell'
    },

    shell: {
      test: {
        options: {
          stdout: true
        },
        command: '<%= pkg.scripts.test %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
};
