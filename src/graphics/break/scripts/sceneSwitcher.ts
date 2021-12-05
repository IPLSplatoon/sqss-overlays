import gsap from 'gsap';
import { activeBreakScene } from '../../helpers/replicants';

const sceneSwitchTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    sceneSwitchTl.addLabel('sceneHide');
    switch (oldValue) {
        case 'main':
            sceneSwitchTl.add(hideMainScene());
    }

    sceneSwitchTl.addLabel('sceneShow');
    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene());
    }
});

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.main-scene-wrapper', { display: 'none' });
        }
    });

    tl.to(
        '.main-scene-wrapper .data-container',
        { duration: 0.35, y: 25, ease: 'power4.in', stagger: 0.1, opacity: 0 }, 'sceneHide');
    tl.to('.main-scene-wrapper > .logo-section', { duration: 1, x: -900, ease: 'power2.in', delay: 0.2 }, 'sceneHide');

    return tl;
}

function showMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.main-scene-wrapper', { display: 'unset' });
        }
    });

    tl.fromTo(
        '.main-scene-wrapper .data-container',
        { y: -25 },
        { duration: 0.35, y: 0, ease: 'power4.out', stagger: 0.1, opacity: 1, delay: 0.35 }, 'sceneShow');
    tl.to('.main-scene-wrapper > .logo-section', { duration: 1, x: 0, ease: 'power2.out' }, 'sceneShow');

    return tl;
}
