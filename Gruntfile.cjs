module.exports = function(grunt) {
  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('version:patch', ['bump:patch']);
  grunt.registerTask('version:minor', ['bump:minor']);
  grunt.registerTask('version:major', ['bump:major']);
  grunt.registerTask('version:prerelease', ['bump:prerelease']);
};
