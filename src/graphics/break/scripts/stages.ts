import { activeBreakScene, activeRound } from '../../helpers/replicants';
import { doOnDifference, doOnOneOrMoreDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import { ActiveRound } from 'schemas';
import { mapNameToImagePath } from '../../helpers/constants';
import { loadImage } from '../../helpers/image';
import { addDots } from '../../helpers/string';
import { hideStageElems, sceneSwitchTl, showStageElems } from './sceneSwitcher';
import gsap from 'gsap';

type GameWinner = 'alpha' | 'bravo' | 'none';

activeRound.on('change', (newValue, oldValue) => {
    elementById('scene-stages__team-a-score').innerText = newValue.teamA.score.toString();
    elementById('scene-stages__team-b-score').innerText = newValue.teamB.score.toString();

    let isNewRound = false;
    doOnDifference(newValue, oldValue, 'match.id', async () => {
        isNewRound = true;
        await Promise.all(newValue.games.map(game => loadImage(getStageUrl(game.stage))));
        if (activeBreakScene.value === 'stages') {
            sceneSwitchTl.add(hideStageElems(() => {
                createStages(newValue);
                sceneSwitchTl.add(showStageElems());
            }));
        } else {
            createStages(newValue);
        }
    });

    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('scene-stages__team-a-name'));

        if (!isNewRound) {
            newValue.games.forEach((game, index) => {
                if (game.winner === 'alpha') {
                    setWinner(game.winner, game.winner, index);
                }
            });
        }
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(addDots(name), elementById('scene-stages__team-b-name'));

        if (!isNewRound) {
            newValue.games.forEach((game, index) => {
                if (game.winner === 'bravo') {
                    setWinner(game.winner, game.winner, index);
                }
            });
        }
    });

    if (!isNewRound) {
        for (let i = 0; i < newValue.games.length; i++) {
            const newGame = newValue.games[i];
            const oldGame = oldValue.games[i];

            doOnDifference(newGame, oldGame, 'winner', (winner: GameWinner, oldWinner: GameWinner) => {
                setWinner(winner, oldWinner, i);
            });

            doOnOneOrMoreDifference(newGame, oldGame, ['stage', 'mode'], async () => {
                await loadImage(getStageUrl(newGame.stage));
                updateStage(newGame, i);
            });
        }
    }
});

const stageProps: Record<string, { width: number, stageGap: number, nameFontSize: number }> = {
    '3': {
        width: 330,
        stageGap: 15,
        nameFontSize: 55
    },
    '5': {
        width: 280,
        stageGap: 12,
        nameFontSize: 55
    },
    '7': {
        width: 210,
        stageGap: 7,
        nameFontSize: 43
    }
};

const stageContainer = elementById('stage-container');

function getStageUrl(stageName: string): string {
    return `assets/stages/${mapNameToImagePath[stageName]}`;
}

function setWinner(winner: GameWinner, oldWinner: GameWinner, index: number) {
    const stageElem = elementById(`stage_${index}`);
    const winnerNameElem = stageElem.querySelector('.stage-winner');
    const winnerNameTextElem = winnerNameElem.querySelector('span');
    const winnerName = getWinnerName(winner);

    if (oldWinner !== 'none' && winner !== 'none') {
        textOpacitySwap(winnerName, winnerNameTextElem);
    } else {
        winnerNameTextElem.innerText = winnerName;
        gsap.to(winnerNameElem, { opacity: winner === 'none' ? 0 : 1, duration: 0.35 });
    }
}

function getWinnerName(winner: GameWinner): string {
    switch (winner) {
        case 'alpha':
            return activeRound.value.teamA.name;
        case 'bravo':
            return activeRound.value.teamB.name;
        default:
            return '';
    }
}

function updateStage(game: { mode: string, stage: string }, index: number) {
    const stageElem = elementById(`stage_${index}`);
    const stageImage = stageElem.querySelector<HTMLDivElement>('.stage-image');
    const stageName = stageElem.querySelector<HTMLDivElement>('.stage-name');
    const stageMode = stageElem.querySelector<FittedText>('.mode');

    function updateElements() {
        stageImage.style.backgroundImage = `url('${getStageUrl(game.stage)}')`;
        stageName.innerText = game.stage;
        stageMode.text = game.mode;
    }

    if (activeBreakScene.value === 'stages') {
        gsap.to(stageElem, { duration: 0.35, y: 35, ease: 'power4.in', opacity: 0, onComplete: () => {
            updateElements();

            gsap.fromTo(stageElem, { immediateRender: false, y: -35 }, { duration: 0.35, y: 0, ease: 'power4.out', opacity: 1 });
        } });
    } else {
        updateElements();
    }
}

function createStages(activeRound: ActiveRound): void {
    const props = stageProps[activeRound.games.length.toString()];

    stageContainer.innerHTML = activeRound.games.reduce((value, game, index) => {
        value += `
            <div class="stage layout" style="width: ${props.width}px; margin: 0 ${props.stageGap}px" id="stage_${index}">
                <div class="stage-winner layout" style="opacity: ${game.winner === 'none' ? '0' : '1'}">
                    <span>${getWinnerName(game.winner)}</span>                
                </div>
                <div class="stage-data layout vertical">
                    <fitted-text class="mode" text="${game.mode}" max-width="${props.width - 20}"></fitted-text>
                    <div class="stage-name" style="font-size: ${props.nameFontSize}px; line-height: ${props.nameFontSize + 5}px">${game.stage}</div>
                </div>
                <div class="stage-image" style="background-image: url('${getStageUrl(game.stage)}')"></div>
            </div>
        `;

        return value;
    }, '');
}
