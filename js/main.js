import {ads} from './ads.js';
import {createCard} from './card.js';
import {toggleForms} from './form.js';

createCard(ads(20));
toggleForms(true);
toggleForms(false);
