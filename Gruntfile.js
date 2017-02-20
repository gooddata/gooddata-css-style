const jestCLI = require('jest-cli');

module.exports = (grunt) => {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-stylelint');

    grunt.initConfig({
        clean: {
            test: ['test/tmp']
        },
        stylelint: {
            test: {
                options: {
                    outputFile: 'test/tmp/output/report.txt',
                    configFile: '.stylelintrc',
                    failOnError: false
                },
                src: 'test/output/output.{css,scss}'
            }
        }
    });

    grunt.registerTask('jest', () => {
        const currentTask = grunt.task.current;
        const done = currentTask.async();

        jestCLI.runCLI(currentTask.options(), process.cwd(), (result) => {
            done(result.success);
        });
    });

    grunt.registerTask('test', ['clean:test', 'stylelint', 'jest']);

    grunt.registerTask('default', 'test');
};
