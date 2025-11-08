module.exports = function (grunt) {
  const fs = require("fs");
  const { execSync } = require("child_process");

  grunt.initConfig({
    bump: {
      options: {
        files: ["package.json"],
        updateConfigs: [],
        commit: false,
        commitMessage: "Release v%VERSION%",
        commitFiles: [
          "package.json",
          "src/layouts/default/Default.vue",
          "CHANGELOG.md",
        ],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: false,
        pushTo: "origin",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
        globalReplace: false,
        prereleaseName: false,
        metadata: "",
        regExp: false,
      },
    },
  });

  grunt.loadNpmTasks("grunt-bump");

  // Custom task to generate changelog
  grunt.registerTask("generateChangelog", function () {
    // Get the current version from package.json
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const currentVersion = packageJson.version;

    // Get the date
    const date = new Date().toISOString().split("T")[0];

    // Read existing changelog if it exists
    let existingChangelog = "";
    let lastVersion = null;
    if (fs.existsSync("CHANGELOG.md")) {
      existingChangelog = fs.readFileSync("CHANGELOG.md", "utf8");
      // Check if this version already exists in changelog
      if (existingChangelog.includes(`## [${currentVersion}]`)) {
        grunt.log.warn(
          `Version ${currentVersion} already exists in CHANGELOG.md. Skipping generation.`
        );
        return;
      }

      // Extract the last version from the changelog
      const versionMatch = existingChangelog.match(/## \[([^\]]+)\]/);
      if (versionMatch) {
        lastVersion = versionMatch[1];
      }
    }

    // Get git log since last version tag, or all commits if no previous version
    let gitLog = "";
    let sinceTag = null;

    // Try to find a tag for the last version
    if (lastVersion) {
      try {
        // Try common tag formats: v0.0.22, 0.0.22
        const possibleTags = [`v${lastVersion}`, lastVersion];
        for (const tag of possibleTags) {
          try {
            const tagCheck = execSync(`git rev-parse ${tag} 2>&1`, {
              encoding: "utf8",
              stdio: "pipe",
            }).trim();
            if (tagCheck && !tagCheck.startsWith("fatal:")) {
              sinceTag = tag;
              break;
            }
          } catch (e) {
            // Tag doesn't exist, try next format
          }
        }
      } catch (e) {
        // No tag found for last version
      }
    }

    // If no specific version tag found, try the most recent tag overall
    if (!sinceTag) {
      try {
        const lastTag = execSync("git describe --tags --abbrev=0 2>&1", {
          encoding: "utf8",
          stdio: "pipe",
        }).trim();
        if (lastTag && !lastTag.startsWith("fatal:")) {
          sinceTag = lastTag;
        }
      } catch (e) {
        // No tags exist at all
      }
    }

    // Extract commit hashes already in the changelog to avoid duplicates
    const existingCommitHashes = new Set();
    if (existingChangelog) {
      const hashMatches = existingChangelog.matchAll(/\(([a-f0-9]{7,})\)/g);
      for (const match of hashMatches) {
        existingCommitHashes.add(match[1]);
      }
    }

    // Check if the found tag matches the current version (which would mean no new commits)
    let tagMatchesCurrentVersion = false;
    if (sinceTag) {
      const tagVersion = sinceTag.replace(/^v/, ""); // Remove 'v' prefix if present
      if (tagVersion === currentVersion) {
        tagMatchesCurrentVersion = true;
      }
    }

    // Get commits since the tag (or all commits if no tag)
    try {
      if (sinceTag && !tagMatchesCurrentVersion) {
        // Check if there are any commits between the tag and HEAD
        const testLog = execSync(
          `git log ${sinceTag}..HEAD --oneline 2>&1`,
          { encoding: "utf8", stdio: "pipe" }
        ).trim();
        if (!testLog || testLog.startsWith("fatal:")) {
          // No commits between tag and HEAD, fall through to alternative strategy
          sinceTag = null;
        } else {
          gitLog = execSync(
            `git log ${sinceTag}..HEAD --pretty=format:"- %s (%h)" --date=short`,
            { encoding: "utf8" }
          );
        }
      }
      
      // If no tag, tag matches current version, or tag range is empty, use alternative strategy
      if (!sinceTag || tagMatchesCurrentVersion || gitLog === "") {
        // Get recent commits and filter out ones already in changelog
        if (lastVersion) {
          // Get commits from the last 30 days as a fallback
          gitLog = execSync(
            `git log --since="30 days ago" --pretty=format:"- %s (%h)" --date=short`,
            { encoding: "utf8" }
          );
        } else {
          // First version, get all commits
          gitLog = execSync(
            'git log --pretty=format:"- %s (%h)" --date=short',
            { encoding: "utf8" }
          );
        }
      }
    } catch (err) {
      gitLog = "- No commits found";
    }

    // Filter out empty lines and commits already in the changelog
    const allCommits = gitLog.split("\n").filter((line) => line.trim());
    const commits = allCommits.filter((line) => {
      // Extract hash from line like "- commit message (abc123)"
      const hashMatch = line.match(/\(([a-f0-9]{7,})\)/);
      if (hashMatch) {
        const hash = hashMatch[1];
        return !existingCommitHashes.has(hash);
      }
      return true; // Keep lines without hashes (shouldn't happen, but be safe)
    });

    if (commits.length === 0) {
      commits.push("- No commits found");
    }

    // Create new changelog entry
    const newEntry = `## [${currentVersion}] - ${date}\n\n${commits.join(
      "\n"
    )}\n\n`;

    // Prepend new entry to existing changelog
    const changelogContent = existingChangelog
      ? newEntry + "---\n\n" + existingChangelog
      : newEntry;

    // Write changelog
    fs.writeFileSync("CHANGELOG.md", changelogContent);

    grunt.log.writeln(
      `Changelog generated for version ${currentVersion} (${
        commits.length
      } commits${sinceTag ? ` since ${sinceTag}` : ""})`
    );
  });

  grunt.registerTask("changelog", ["generateChangelog"]);

  grunt.registerTask("version:patch", ["bump:patch", "generateChangelog"]);
  grunt.registerTask("version:minor", ["bump:minor", "generateChangelog"]);
  grunt.registerTask("version:major", ["bump:major", "generateChangelog"]);
  grunt.registerTask("version:prerelease", [
    "bump:prerelease",
    "generateChangelog",
  ]);
};
