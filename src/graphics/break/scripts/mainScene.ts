import { mainFlavorText } from '../../helpers/replicants';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import gsap from 'gsap';

mainFlavorText.on('change', newValue => {
    textOpacitySwap(newValue, elementById('break-flavor-text'));
});

export function toggleMainRow(element: HTMLElement, isVisible: boolean): void {
    gsap.to(element, {
        duration: 0.35,
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 50 : 0,
        ease: 'power2.inOut'
    });
}

const supportTextTl = gsap.timeline({ repeat: -1 });
const supportTextElems = document.querySelectorAll<HTMLElement>('.support-container');

function setSupportTextLoop() {
    const switchDelay = 20;
    const length = supportTextElems.length;

    for (let i = 0; i < length - 1; i++) {
        const elemFrom = supportTextElems[i];
        const elemTo = supportTextElems[i + 1];

        console.log(elemFrom, elemTo);

        supportTextTl
            .to({}, { duration: switchDelay })
            .to(elemFrom, { duration: 0.35, opacity: 0 }, `change_${i}`)
            .to(elemTo, { duration: 0.35, opacity: 1 }, `change_${i}`);
    }

    supportTextTl
        .to({}, { duration: switchDelay })
        .to(supportTextElems[length - 1], { duration: 0.35, opacity: 0 }, 'change_final')
        .to(supportTextElems[0], { duration: 0.35, opacity: 1 }, 'change_final');
}

setSupportTextLoop();
