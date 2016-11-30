import 'promise-polyfill';
import 'fetch';

import industry from './js/data/industry.js';
import responsibility from './js/data/responsibility.js';
import position from './js/data/position.js';

import Dropdown from './js/dropdown.js';
import ProfileForm from './js/profile-form.js';
import Tracker from './js/tracker.js';

Dropdown.init([industry, responsibility, position]);
ProfileForm.init();

new Tracker({
	selector: '#profileForm'
}).uponInput();