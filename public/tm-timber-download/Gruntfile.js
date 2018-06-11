module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				files: {
					'js/components/timber.min.js': 'js/components/timber.js',
					'js/plugins/jquery.tm.avalanche.min.js': 'js/plugins/jquery.tm.avalanche.js',
					'js/plugins/jquery.tm.counter.min.js': 'js/plugins/jquery.tm.counter.js',
					'js/plugins/jquery.tm.equalize.min.js': 'js/plugins/jquery.tm.equalize.js',
					'js/plugins/jquery.tm.horizon.min.js': 'js/plugins/jquery.tm.horizon.js',
					'js/plugins/jquery.tm.retinize.min.js': 'js/plugins/jquery.tm.retinize.js',
					'js/plugins/jquery.tm.snowbridge.min.js': 'js/plugins/jquery.tm.snowbridge.js',
					'js/plugins/jquery.tm.summit.min.js': 'js/plugins/jquery.tm.summit.js',
					'js/plugins/jquery.tm.swipe.min.js': 'js/plugins/jquery.tm.swipe.js',
					'js/plugins/jquery.tm.css-editor.min.js': 'js/plugins/jquery.tm.css-editor.js'
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'css/core.min.css': ['css/components/timber.css', 'css/plugins/avalanche.css', 'css/plugins/horizon.css', 'css/plugins/snowbridge.css', 'css/plugins/summit.css', 'css/plugins/github.css', 'css/plugins/demo-editor.css', 'css/plugins/style.css' ]
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}]
			}
		}
	});

  // Uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // CSS min
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Imgs  min
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin']);

};