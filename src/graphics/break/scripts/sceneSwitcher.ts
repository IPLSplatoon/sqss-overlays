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

    sceneSwitchTl.addLabel('sceneShow', ['teams', 'main'].includes(oldValue) ? 'sceneHide' : undefined);
    sceneSwitchTl.add(setBgPosition(bgPosition, bgMoveDuration), 'sceneShow');
    switch (newValue) {
        case 'main':
            sceneSwitchTl.add(showMainScene(), 'sceneShow');
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
    tl.to('#content-background', { backgroundPositionX: `${position * 1.05}px`, duration, ease }, 'sceneShow');
    tl.to('.scene-content-wrapper', { x: position, duration, ease, delay: 0.05 }, 'sceneShow');

    return tl;
}

function hideMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(
        '.main-scene-wrapper .data-container',
        { duration: 0.7, rotate: '-=12', ease: 'power1.in', delay: 0.3 }, 'sceneHide');

    return tl;
}

function showMainScene(): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl
        .fromTo(
            '.main-scene-wrapper .data-container',
            { rotate: -2, immediateRender: false },
            { duration: 1, rotate: 12 })
        .to(
            '.main-scene-wrapper .data-container-support',
            { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)' }, 'data-container-wiggle')
        .to(
            '.main-scene-wrapper .data-container-main',
            { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)' }, 'data-container-wiggle');

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

    tl
        .fromTo(
            '.teams-wrapper .team',
            { rotate: rotateStart, immediateRender: false },
            { duration: 1, rotate: rotateTo, ease: 'power3.in', stagger: 0.1 })
        .to(
            '.teams-wrapper .team-a',
            { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)' },
            'team-wrapper-bounce')
        .to(
            '.teams-wrapper .team-b',
            { duration: 4, rotate: gsap.utils.random(-2, 2, 0.1), ease: 'elastic.out(1, 0.3)', delay: 0.1 },
            'team-wrapper-bounce');

    return tl;
}

export function hideStageElems(callback?: gsap.Callback): gsap.core.Timeline {
    return gsap.timeline({ onComplete: callback });
}

export function showStageElems(): gsap.core.Timeline {
    return gsap.timeline();
}

function hideStages(): gsap.core.Timeline {
    return gsap.timeline();
}

function showStages(): gsap.core.Timeline {
    return gsap.timeline();
}
