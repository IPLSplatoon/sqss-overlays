import gsap from 'gsap';
import { activeBreakScene } from '../../helpers/replicants';
import lottie from 'lottie-web';
import { elementById } from '../../helpers/elem';

export const sceneSwitchTl = gsap.timeline();

type Scene = 'main' | 'teams' | 'stages';

const mainLogoContainer = elementById<HTMLCanvasElement>('main-logo-container');

const logoAnimation = lottie.loadAnimation({
    container: mainLogoContainer,
    loop: false,
    autoplay: true,
    renderer: 'svg',
    path: 'assets/sqss-logoAnim.json'
});

activeBreakScene.on('change', (newValue, oldValue) => {
    if (!oldValue) oldValue = 'main';

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
            sceneSwitchTl.add(showMainScene(oldValue), 'sceneShow');
            break;
        case 'teams':
            sceneSwitchTl.add(showTeams(oldValue), 'sceneShow');
            break;
        case 'stages':
            sceneSwitchTl.add(showStages(oldValue), 'sceneShow');
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
        { duration: 1, rotate: '+=12', ease: 'power2.inOut' }, 'sceneHide+=0.4');

    return tl;
}

function showMainScene(oldValue: Scene): gsap.core.Timeline {
    const tl = gsap.timeline({
        delay: oldValue === 'stages' ? 0.3 : 0,
        onStart: () => {
            logoAnimation.goToAndStop(oldValue === 'stages' ? 1.2 : 1, true);
            gsap.delayedCall(1, () => {
                logoAnimation.play();
            });
        }
    });

    if (oldValue === 'stages') {
        tl.fromTo(
            '.teams-wrapper .team',
            { rotate: -4, immediateRender: false },
            { rotate: -24, duration: 1, ease: 'power1.inOut' }, 'sceneShow+=0.5');
    }

    tl
        .fromTo(
            '.main-scene-wrapper .data-container',
            { rotate: -2, immediateRender: false },
            { duration: 1, rotate: -12, ease: 'power3.in' }, 'sceneShow')
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

    const rotateTo = newValue === 'main' ? -18 : 18;

    tl.to(
        '.teams-wrapper .team',
        { duration: 0.7, rotate: `+=${rotateTo}`, ease: 'power1.in', stagger: 0.05, delay: 0.3 }, 'sceneHide');

    return tl;
}

function showTeams(oldValue: Scene): gsap.core.Timeline {
    const tl = gsap.timeline();

    const rotateStart = oldValue === 'main' ? 2 : -2;
    const rotateTo = oldValue === 'main' ? 12 : -12;

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
    const tl = gsap.timeline({ onComplete: callback });

    tl.to('.stages', { duration: 0.35, opacity: 0 });

    return tl;
}

export function showStageElems(): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to('.stages', { duration: 0.35, opacity: 1 });

    return tl;
}

function hideStages(): gsap.core.Timeline {
    return gsap.timeline();
}

function showStages(oldValue: Scene): gsap.core.Timeline {
    const tl = gsap.timeline();

    if (oldValue === 'main') {
        tl.fromTo(
            '.teams-wrapper .team',
            { rotate: 4, immediateRender: false },
            { rotate: 24, duration: 1, delay: 0.75, ease: 'power1.inOut' });
    }

    return tl;
}
