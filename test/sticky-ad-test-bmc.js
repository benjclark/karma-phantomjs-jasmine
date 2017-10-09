describe('sticky-ad.js', () => {
    beforeEach(() => loadFixtures('sticky-ad-fixture-bmc.html'));

    it('Sets the distance from the top', done => {
        const stickyAd = require('../modules/sticky-ad');
        const ad = document.querySelector('[data-component="sticky-ad"]');

        expect(ad.dataset.distanceFromTop).toBe(undefined);
        ad.getBoundingClientRect = () => ({
            top: 150
        });

        stickyAd.init(ad);
        expect(parseInt(ad.dataset.distanceFromTop, 10)).toBe(150);

        // Next tick - allows new element to gain focus before making assertion
        // Can't use requestAnimationFrame because Jasmine
        // Even though the assertion doesn't happen here, we need to let the test know to
        // wait enough time for the code inside the rAF to finish executing.
        setTimeout(() => {
            done();
        }, 50);
    });

    it('Creates and appends ghoooooooost element 👻 ', done => {
        const stickyAd = require('../modules/sticky-ad');
        const ad = document.querySelector('[data-component="sticky-ad"]');

        expect(document.querySelector('.c-ghost')).not.toExist();

        stickyAd.init(ad);
        expect(document.querySelector('.c-ghost')).toExist();

        // Next tick - allows new element to gain focus before making assertion
        // Can't use requestAnimationFrame because Jasmine
        // Even though the assertion doesn't happen here, we need to let the test know to
        // wait enough time for the code inside the rAF to finish executing.
        setTimeout(() => {
            done();
        }, 50);
    });

    it('Should set correct classnames and top positioning', done => {
        const stickyAd = require('../modules/sticky-ad');
        const ad = document.querySelector('[data-component="sticky-ad"]');

        ad.getBoundingClientRect = () => ({
            top: 12
        });

        expect(ad).not.toHaveClass('is-fixed');
        expect(ad.style.top).toBe('');

        stickyAd.init(ad);

        // Next tick - allows new element to gain focus before making assertion
        // Can't use requestAnimationFrame because Jasmine
        setTimeout(() => {
            expect(document.querySelector('[data-component="sticky-ad"]')).toHaveClass('is-fixed');
            expect(document.querySelector('[data-component="sticky-ad"]').style.top).toBe('12px');

            ad.getBoundingClientRect = () => ({
                top: 12
            });

            const event = new Event('scroll');
            window.dispatchEvent(event);

            setTimeout(() => {
                expect(document.querySelector('[data-component="sticky-ad"]')).not.toHaveClass('is-fixed');
                expect(document.querySelector('[data-component="sticky-ad"]').style.top).toBe('0px');
                done();
            }, 50);
        }, 50);
    });
});