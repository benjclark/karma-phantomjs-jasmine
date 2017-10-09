let lastScrollY = 0;
let ticking = false;
let sticky = false;
let constraintCollision = false;

function update(component, constraint) {
    const offset = parseInt(component.getAttribute('data-sticky-ad-offset'), 10) || 0;
    const ghostEl = component.parentNode.querySelector('.c-ghost');

    if (sticky) {
        if (lastScrollY <= (parseInt(component.getAttribute('data-distance-from-top'), 10)) - offset) {
            // If scrolled back past component original position, unstick it.
            sticky = false;
            component.classList.remove('is-fixed');
            ghostEl.classList.remove('is-active');
            // eslint-disable-next-line no-param-reassign
            component.style.top = '0';
        } else if (constraint !== undefined && constraintCollision && parseInt(constraint.getBoundingClientRect().top, 10) >= (parseInt(window.getComputedStyle(component).height, 10) + offset)) {
            // If collision is true and the distance from viewport to top of footer is greater than the height of the ad plus the offset
            constraintCollision = false;
            // eslint-disable-next-line no-param-reassign
            component.style.marginTop = '0';
        } else if (constraintCollision || (constraint !== undefined && parseInt(component.getBoundingClientRect().bottom, 10) >= (parseInt(constraint.getBoundingClientRect().top, 10) - offset))) {
            const collisionOverlap = (parseInt(constraint.getBoundingClientRect().top, 10) - parseInt(component.getBoundingClientRect().bottom, 10)) + parseInt(window.getComputedStyle(component).marginTop, 10) - offset;
            constraintCollision = true;
            // eslint-disable-next-line no-param-reassign
            component.style.marginTop = `${collisionOverlap}px`;
        }
    } else if (parseInt(component.getBoundingClientRect().top, 10) <= offset) {
        sticky = true;
        component.classList.add('is-fixed');
        ghostEl.classList.add('is-active');

        // eslint-disable-next-line no-param-reassign
        component.style.top = `${offset}px`;
    }
    ticking = false;
}

function requestTick(component, constraint) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            update(component, constraint);
        });
        ticking = true;
    }
}

function onScroll(component, constraint) {
    lastScrollY = window.scrollY;
    requestTick(component, constraint);
}

function createGhostComponent(component) {
    const ghostEl = document.createElement('div');
    ghostEl.style.height = `${parseInt(window.getComputedStyle(component).height, 10)}px`;
    ghostEl.classList.add('c-ghost');
    component.parentNode.appendChild(ghostEl);
}

function init(component) {
    // bottom constraint should always be the first one in the document hierarchy
    // caters for when you have a journal and publisher footer, constraint should be journal
    const constraint = document.querySelectorAll('[data-sticky-ad-constraint="bottom"]')[0];

    createGhostComponent(component);
    component.setAttribute('data-distance-from-top', (component.getBoundingClientRect().top + window.scrollY));

    onScroll(component, constraint);

    window.addEventListener('scroll', () => {
        onScroll(component, constraint);
    }, false);
}

module.exports = {init};
