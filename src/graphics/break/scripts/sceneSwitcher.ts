import gsap from 'gsap';
import { activeBreakScene } from '../../helpers/replicants';

export const sceneSwitchTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    sceneSwitchTl.addLabel('sceneHide');
    switch (oldValue) {
        case 'main':
            sceneSwitchTl.add(hideMainScene());
            break;
        case 'teams':
            sceneSwitchTl.add(hideTeams());
            break;
        case 'stages':
            sceneSwitchTl.add(hideStages());
    }

    sceneSwitchTl.addLabel('sceneShow');
    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene());
            break;
        case 'teams':
            sceneSwitchTl.add(showTeams());
            break;
        case 'stages':
            sceneSwitchTl.add(showStages());
    }
});

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.main-scene-wrapper', { visibility: 'hidden' });
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
            gsap.set('.main-scene-wrapper', { visibility: 'visible' });
        }
    });

    tl.fromTo(
        '.main-scene-wrapper .data-container',
        { y: -25 },
        { duration: 0.35, y: 0, ease: 'power4.out', stagger: 0.1, opacity: 1, delay: 0.35 }, 'sceneShow');
    tl.to('.main-scene-wrapper > .logo-section', { duration: 1, x: 0, ease: 'power2.out' }, 'sceneShow');

    return tl;
}

function hideTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.teams-wrapper', { visibility: 'hidden' });
        }
    });

    tl.to(
        '.teams-wrapper .team',
        { duration: 0.35, y: 25, ease: 'power4.in', stagger: 0.1, opacity: 0 }, 'sceneHide');

    return tl;
}

function showTeams(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.teams-wrapper', { visibility: 'visible' });
        }
    });

    tl.fromTo(
        '.teams-wrapper .team',
        { y: -25 },
        { duration: 0.35, y: 0, ease: 'power4.out', stagger: 0.1, opacity: 1, delay: 0.35 }, 'sceneShow');

    return tl;
}

export function hideStageElems(callback?: gsap.Callback): gsap.core.Timeline {
    const tl = gsap.timeline({ onComplete: callback });

    tl.to('.stages-wrapper .stage', { duration: 0.35, ease: 'power4.in', stagger: 0.05, opacity: 0, y: 35 });

    return tl;
}

export function showStageElems(): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.fromTo(
        '.stages-wrapper .stage',
        { y: -35 },
        { duration: 0.35, ease: 'power4.out', stagger: 0.05, opacity: 1, y: 0 });

    return tl;
}

function hideStages(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.stages-wrapper', { visibility: 'hidden' });
        }
    });

    tl
        .add(hideStageElems(), 'sceneHide')
        .to('.stages-wrapper .scoreboard', { duration: 0.35, opacity: 0 }, 'sceneHide');

    return tl;
}

function showStages(): gsap.core.Timeline {
    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.stages-wrapper', { visibility: 'visible' });
            gsap.set('.stages-wrapper .stage', { opacity: 0 });
        }
    });

    tl
        .add(showStageElems(), 'sceneShow')
        .to('.stages-wrapper .scoreboard', { duration: 0.35, opacity: 1 }, 'sceneShow');

    return tl;
}
