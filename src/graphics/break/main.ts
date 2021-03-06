import './styles/break.scss';

import 'fitted-text/dist/fitted-text';

import './scripts/mainScene';
import './scripts/music';
import './scripts/nextRoundTimer';
import './scripts/sceneSwitcher';
import './scripts/teams';
import './scripts/stages';
import './scripts/infoBar';
import './scripts/casters';

import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons/faMicrophoneAlt';

library.add(faClock, faMusic, faTwitter, faDiscord, faGlobe, faMicrophoneAlt);
dom.watch();
