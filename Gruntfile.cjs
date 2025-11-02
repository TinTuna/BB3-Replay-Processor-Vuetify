module.exports = function(grunt) {
  const fs = require('fs');
  const { execSync } = require('child_process');

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'src/layouts/default/Default.vue', 'CHANGELOG.md'],
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
    },
    exec: {
      generateChangelog: {
        cmd: function() {
          // Get the current version from package.json
          const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
          const currentVersion = packageJson.version;
          
          // Get git log since last tag, or all commits if no tags
          let gitLog = '';
          try {
            // Try to get commits since last tag
            const lastTag = execSync('git describe --tags --abbrev=0 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
            if (lastTag && !lastTag.startsWith('fatal:')) {
              gitLog = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s (%h)" --date=short`, { encoding: 'utf8' });
            } else {
              // If no tags exist, get all commits
              gitLog = execSync('git log --pretty=format:"- %s (%h)" --date=short', { encoding: 'utf8' });
            }
          } catch (e) {
            // If no tags exist, get all commits
            try {
              gitLog = execSync('git log --pretty=format:"- %s (%h)" --date=short', { encoding: 'utf8' });
            } catch (err) {
              gitLog = '- Initial release';
            }
          }
          
          // Filter out empty lines and ensure we have content
          const commits = gitLog.split('\n').filter(line => line.trim());
          if (commits.length === 0) {
            commits.push('- No commits found');
          }
          
          // Get the date
          const date = new Date().toISOString().split('T')[0];
          
          // Read existing changelog if it exists
          let existingChangelog = '';
          if (fs.existsSync('CHANGELOG.md')) {
            existingChangelog = fs.readFileSync('CHANGELOG.md', 'utf8');
          }
          
          // Create new changelog entry
          const newEntry = `## [${currentVersion}] - ${date}\n\n${commits.join('\n')}\n\n`;
          
          // Prepend new entry to existing changelog
          const changelogContent = existingChangelog 
            ? newEntry + '---\n\n' + existingChangelog
            : newEntry;
          
          // Write changelog
          fs.writeFileSync('CHANGELOG.md', changelogContent);
          
          return `Changelog generated for version ${currentVersion}`;
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('changelog', ['exec:generateChangelog']);
  
  grunt.registerTask('version:patch', ['bump:patch', 'exec:generateChangelog']);
  grunt.registerTask('version:minor', ['bump:minor', 'exec:generateChangelog']);
  grunt.registerTask('version:major', ['bump:major', 'exec:generateChangelog']);
  grunt.registerTask('version:prerelease', ['bump:prerelease', 'exec:generateChangelog']);
};
