module.exports = function(grunt) {

  grunt.initConfig({

    // Project configuration
    pkg: grunt.file.readJSON('package.json'),

    // Compile Sass
    sass: {
      options: {
        sourceMap: true,
        sourceComments: false
      },
      dist: {
        files: {
          'css/bedrock.css': 'sass/bedrock.scss'
        }
      }
    },

    // Minify compiled CSS
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/bedrock.min.css': ['css/bedrock.css']
        }
      }
    },

    // SCSS Lint
    scsslint: {
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      },
      src: ['sass/**/*.scss', '!sass/partials/_base.scss']
    },

    // Runs CSS reporting
    parker: {
      options: {
        metrics: [
          'TotalStylesheets',
          'TotalStylesheetSize',
          'TotalRules',
          'TotalSelectors',
          'TotalIdentifiers',
          'TotalDeclarations',
          'SelectorsPerRule',
          'IdentifiersPerSelector',
          'SpecificityPerSelector',
          'TopSelectorSpecificity',
          'TopSelectorSpecificitySelector',
          'TotalIdSelectors',
          'TotalUniqueColours',
          'TotalImportantKeywords',
          'TotalMediaQueries'
        ],
        file: "./stats.md",
        usePackage: true
      },
      src: [
        'css/*.css'
      ],
    },

    // Watch and build
    watch: {
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'cssmin', 'parker']
      }
    }

  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-parker');
  grunt.loadNpmTasks('grunt-sass');

  // Run tasks
  grunt.registerTask('default', ['sass', 'cssmin', 'scsslint', 'parker']);

};
