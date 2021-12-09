import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';

const casterNamesText = elementById<FittedText>('info-bar-caster-names');
const casterTwittersText = elementById<FittedText>('info-bar-caster-twitters');

casters.on('change', newValue => {
    const values = Object.values(newValue);
    const count = values.length;

    casterNamesText.text = values.reduce((existingValue, caster, index) => {
        existingValue += `
            ${caster.name} <span class="pronoun">${caster.pronouns}</span>${index === count - 1 ? ' ' : index === count - 2 ? ' & ' : ', '}
        `;

        return existingValue;
    }, '');

    casterTwittersText.text = values.reduce((existingValue, caster, index) => {
        existingValue += `
            ${caster.twitter} <span class="pronoun">${caster.pronouns}</span>${index === count - 1 ? ' ' : index === count - 2 ? ' & ' : ', '}
        `;

        return existingValue;
    }, '');
});
