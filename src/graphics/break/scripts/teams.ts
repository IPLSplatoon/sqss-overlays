import { activeRound } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import { addDots } from '../../helpers/string';
import gsap from 'gsap';

const teamAUpdateTl = gsap.timeline();
const teamBUpdateTl = gsap.timeline();

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('scene-teams__team-a-name'));
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('scene-teams__team-b-name'));
    });

    function createPlayerNameUpdate(team: 'a' | 'b'): gsap.core.Timeline {
        const players = team === 'a' ? newValue.teamA.players : newValue.teamB.players;
        const playerContainerId = `scene-teams__team-${team}-players`;

        const updateTl = gsap.timeline();
        updateTl.to(`#${playerContainerId} > fitted-text`, {
            duration: 0.35,
            opacity: 0,
            onComplete: () => {
                const playersContainer = elementById(playerContainerId);
                playersContainer.innerHTML = '';
                players.forEach(player => {
                    const playerName = document.createElement('fitted-text') as FittedText;
                    playerName.classList.add('team-player');
                    playerName.text = addDots(player.name);
                    playerName.maxWidth = 477;
                    playersContainer.appendChild(playerName);
                    playerName.style.opacity = '0';
                });

                updateTl.to(`#${playerContainerId} > fitted-text`, { duration: 0.35, opacity: 1, stagger: 0.05 });
            }
        });

        return updateTl;
    }

    doOnDifference(newValue, oldValue, 'teamA.players', () => {
        teamAUpdateTl.add(createPlayerNameUpdate('a'));
    });

    doOnDifference(newValue, oldValue, 'teamB.players', () => {
        teamBUpdateTl.add(createPlayerNameUpdate('b'));
    });
});
