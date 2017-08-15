const stylelint = require('stylelint');

describe('report', () => {
    it('should not contain any messages', () => {
        return stylelint.lint({
                cache: false,
                files: 'test/output/output.scss',
                syntax: 'scss'
            })
            .then((resultObject) => {
                expect(resultObject.errored).toEqual(false);
            });
    });
});
