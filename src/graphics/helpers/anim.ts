import { gsap } from 'gsap';

export function textOpacitySwap(
    newText: string,
    elem: HTMLElement,
    extraElems: HTMLElement[] = [],
    callback?: gsap.Callback
): gsap.core.Tween[] {
    return [
        gsap.to([elem, ...extraElems], {
            opacity: 0, duration: 0.35, onComplete: () => {
                if (elem.tagName === 'FITTED-TEXT') {
                    (elem as FittedText).text = newText;
                } else {
                    elem.innerText = newText;
                }
            }
        }),
        gsap.to([elem, ...extraElems], { opacity: 1, duration: 0.35, delay: 0.35, onComplete: callback })
    ];
}

export function textSlideSwap(newText: string, elem: FittedText): gsap.core.Tween[] {
    return [
        gsap.to(elem, {
            duration: 0.35,
            opacity: 0,
            x: 15,
            ease: 'power2.in',
            onComplete: () => { elem.text = newText; gsap.set(elem, { x: -15 }); }
        }),
        gsap.to(elem, { duration: 0.35, x: 0, opacity: 1, delay: 0.35, ease: 'power2.out' })
    ];
}
