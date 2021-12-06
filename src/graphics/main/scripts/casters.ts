import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { DASHBOARD_BUNDLE_NAME } from '../../helpers/constants';
import gsap from 'gsap';

const casterContainer = elementById('casters');

casters.on('change', newValue => {
    casterContainer.innerHTML = Object.values(newValue).reduce((existingValue, caster) => {
        existingValue += `
            <div class="caster">
                <fitted-text class="caster-name" use-inner-html max-width="286" text="${caster.name} <span class=&quot;pronoun&quot;>${caster.pronouns}</span>"></fitted-text>
                <fitted-text class="caster-twitter" max-width="286" text="${caster.twitter}"></fitted-text>
            </div>
        `;

        return existingValue;
    }, '');
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    gsap.killTweensOf('.casters-wrapper');
    gsap.to('.casters-wrapper', { duration: 0.5, y: 0, ease: 'power4.out' });
    gsap.to('.casters-wrapper', { duration: 0.5, y: 350, ease: 'power4.in', delay: 20.5 });
});
