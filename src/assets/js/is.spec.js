import { isEs6, isArray } from './is';

describe('scroll.js', () => {
    it('should', () => {
        expect(isEs6()).to.equal(true);
    });

    it('should be an array', () => {
        expect(isArray(['test'])).to.equal(true);
    });

    it('should not be an array', () => {
        expect(isArray({'test': 'noarray'})).to.equal(false);
    });
});
