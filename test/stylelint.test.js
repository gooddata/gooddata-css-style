const grunt = require('grunt');

describe('report', () => {
    it('should not contain deprecations', () => {
        expect(grunt.file.read('test/tmp/output/report.txt')).not.toContain('Deprecation Warning');
    });
});
