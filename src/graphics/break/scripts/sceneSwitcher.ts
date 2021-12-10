import gsap from 'gsap';
import { activeBreakScene } from '../../helpers/replicants';

export const sceneSwitchTl = gsap.timeline();

type Scene = 'main' | 'teams' | 'stages';

activeBreakScene.on('change', (newValue, oldValue) => {
    sceneSwitchTl.addLabel('sceneHide');
    switch (oldValue) {
        case 'main':
            sceneSwitchTl.add(hideMainScene());
            break;
        case 'teams':
            sceneSwitchTl.add(hideTeams(newValue), 'sceneHide');
            break;
        case 'stages':
            sceneSwitchTl.add(hideStages());
    }

    const bgPosition = {
        main: 0,
        teams: -1920,
        stages: -3840
    }[newValue];
    const baseBgMoveDuration = 1.5;
    const bgMoveDuration
        = (newValue === 'main' && oldValue === 'stages') || (newValue === 'stages' && oldValue === 'main')
            ? baseBgMoveDuration * 1.5 : baseBgMoveDuration;

    sceneSwitchTl.addLabel('sceneShow', oldValue === 'teams' ? 'sceneHide' : undefined);
    sceneSwitchTl.add(setBgPosition(bgPosition, bgMoveDuration), 'sceneShow');
    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene());
            break;
        case 'teams':
            sceneSwitchTl.add(showTeams(oldValue), 'sceneShow');
            break;
        case 'stages':
            sceneSwitchTl.add(showStages());
    }
});

function setBgPosition(position: number, duration: number): gsap.core.Timeline {
    const tl = gsap.timeline();

    const ease = 'power2.inOut';
    tl.to('#content-background', { backgroundPositionX: `${position}px`, duration, ease }, 'sceneShow');
    tl.to('.scene-content-wrapper', { x: position, duration, ease }, 'sceneShow');

    return tl;
}

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // tl.to(
    //     '.main-scene-wrapper .data-container',
    //     { duration: 0.35, y: 25, ease: 'power4.in', stagger: 0.1, opacity: 0 }, 'sceneHide');
    // tl.to('.main-scene-wrapper > .logo-section', { duration: 1, x: -900, ease: 'power2.in', delay: 0.2 }, 'sceneHide');

    return tl;
}

function showMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // tl.fromTo(
    //     '.main-scene-wrapper .data-container',
    //     { y: -25 },
    //     { duration: 0.35, y: 0, ease: 'power4.out', stagger: 0.1, opacity: 1, delay: 0.35 }, 'sceneShow');
    // tl.to('.main-scene-wrapper > .logo-section', { duration: 1, x: 0, ease: 'power2.out' }, 'sceneShow');

    return tl;
}

function hideTeams(newValue: Scene): gsap.core.Timeline {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.teams-wrapper .team', { rotate: gsap.utils.random(-2, 2, 0.1), delay: 0.3 });
        }
    });

    const rotateTo = newValue === 'main' ? 12 : -12;

    tl.to(
        '.teams-wrapper .team',
        { duration: 0.7, rotate: `+=${rotateTo}`, ease: 'power1.in', stagger: 0.05, delay: 0.3 }, 'sceneHide');

    return tl;
}

function showTeams(oldValue: Scene): gsap.core.Timeline {
    const tl = gsap.timeline();

    const rotateStart = oldValue === 'main' ? -2 : 2;
    const rotateTo = oldValue === 'main' ? -12 : 12;

    tl.fromTo(
        '.teams-wrapper .team',
        { rotate: rotateStart, immediateRender: false },
        { duration: 1, rotate: rotateTo, ease: 'power3.in', stagger: 0.1 });
    tl.to(
        '.teams-wrapper .team-a',
        { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)' }, 'team-wrapper-bounce');
    tl.to(
        '.teams-wrapper .team-b',
        { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)', delay: 0.1 }, 'team-wrapper-bounce');

    return tl;
}

export function hideStageElems(callback?: gsap.Callback): gsap.core.Timeline {
    const tl = gsap.timeline({ onComplete: callback });

    // tl.to('.stages-wrapper .stage', { duration: 0.35, ease: 'power4.in', stagger: 0.05, opacity: 0, y: 35 });

    return tl;
}

export function showStageElems(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // tl.fromTo(
    //     '.stages-wrapper .stage',
    //     { y: -35 },
    //     { duration: 0.35, ease: 'power4.out', stagger: 0.05, opacity: 1, y: 0 });

    return tl;
}

function hideStages(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // tl
    //     .add(hideStageElems(), 'sceneHide')
    //     .to('.stages-wrapper .scoreboard', { duration: 0.35, opacity: 0 }, 'sceneHide');

    return tl;
}

function showStages(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // tl
    //     .add(showStageElems(), 'sceneShow')
    //     .to('.stages-wrapper .scoreboard', { duration: 0.35, opacity: 1 }, 'sceneShow');

    return tl;
}
