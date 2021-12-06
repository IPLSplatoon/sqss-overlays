import { activeRound, scoreboardData } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import gsap from 'gsap';
import { addDots } from '../../helpers/string';

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('team-a-name'));
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('team-b-name'));
    });

    elementById('team-a-score').innerText = newValue.teamA.score.toString();
    elementById('team-b-score').innerText = newValue.teamB.score.toString();

    gsap.to('#team-a-color', { duration: 0.5, backgroundColor: newValue.teamA.color });
    gsap.to('#team-b-color', { duration: 0.5, backgroundColor: newValue.teamB.color });
});

scoreboardData.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'flavorText', (flavorText: string) => {
        textOpacitySwap(flavorText, elementById('flavor-text'));
    });

    doOnDifference(newValue, oldValue, 'isVisible', (isVisible: boolean) => {
        gsap.to('.scoreboard-wrapper', {
            duration: 0.5,
            y: isVisible ? 0 : -250,
            rotate: isVisible ? 0 : -4,
            ease: isVisible ? 'power4.out' : 'power4.in'
        });
    });
});
