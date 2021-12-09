import gsap from 'gsap';
import { ObsEvent } from '../../helpers/obs';
import { DASHBOARD_BUNDLE_NAME } from '../../helpers/constants';

const infoBarTl = gsap.timeline();
const infoBarShowDuration = 50;

if (window.obsstudio) {
    window.addEventListener('obsSourceActiveChanged', (e: ObsEvent) => {
        if (e.detail.active) {
            showCasters();
        }
    });
} else {
    nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
        showCasters();
    });
}

function showCasters() {
    infoBarTl.seek('>');

    const tl = gsap.timeline({
        onStart: () => {
            gsap.set('.info-bar-casters__name-display', { opacity: 1 });
            gsap.set('.info-bar-casters__twitter-display', { opacity: 0 });
        },
        delay: 2
    });

    tl.addLabel('showBar');
    tl.to('.scene-content-wrapper', { y: -75, duration: 0.5, ease: 'power4.out' }, 'showBar');
    tl.to('.info-bar-wrapper', { y: 0, duration: 0.5, ease: 'power4.out' }, 'showBar');

    tl.to({}, { duration: infoBarShowDuration / 2 });

    tl.addLabel('showTwitters');
    tl.to('.info-bar-casters__name-display', { duration: 0.35, opacity: 0 }, 'showTwitters');
    tl.to('.info-bar-casters__twitter-display', { duration: 0.35, opacity: 1 }, 'showTwitters');

    tl.to({}, { duration: infoBarShowDuration / 2 });

    tl.addLabel('hideBar');
    tl.to('.scene-content-wrapper', { y: 0, duration: 0.5, ease: 'power4.inOut' }, 'hideBar');
    tl.to('.info-bar-wrapper', { y: 150, duration: 0.5, ease: 'power4.inOut' }, 'hideBar');

    infoBarTl.add(tl);
}
