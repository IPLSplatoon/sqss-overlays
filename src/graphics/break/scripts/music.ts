import { musicShown, nowPlaying } from '../../helpers/replicants';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import { toggleMainRow } from './mainScene';

nowPlaying.on('change', newValue => {
    const newText = [newValue.artist, newValue.song].filter(Boolean).join(' - ');

    textOpacitySwap(newText, elementById('break-main-music'));
});

musicShown.on('change', newValue => {
    toggleMainRow(elementById('main-music-row'), newValue);
});
