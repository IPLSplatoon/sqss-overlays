import { nextRoundTime } from '../../helpers/replicants';
import { DateTime } from 'luxon';
import { elementById } from '../../helpers/elem';
import { toggleMainRow } from './mainScene';

const nextRoundTimeElem = elementById<FittedText>('break-round-start-time');
let nextStageDate: DateTime;
let lastDiff: number;

nextRoundTime.on('change', (newValue, oldValue) => {
    if (newValue.isVisible !== oldValue?.isVisible) {
        toggleMainRow(elementById('main-timer-row'), newValue.isVisible);
    }

    nextStageDate = DateTime.fromISO(newValue.startTime);
});

setInterval(() => {
    const diff = Math.ceil(nextStageDate.diffNow(['minutes']).toObject().minutes);
    if (lastDiff !== diff) {
        lastDiff = diff;
        let newText;

        if (diff < 1) {
            newText = 'Next round starts <span class="bold">soon!</span>';
        } else if (diff === 1) {
            newText = `Next round starts in <span class="bold">~${diff}</span> minute...`;
        } else {
            newText = `Next round starts in <span class="bold">~${diff}</span> minutes...`;
        }

        nextRoundTimeElem.text = newText;
    }
}, 1000);
