import 'promise-polyfill';
import 'fetch';

import FormValidator from './js/form-validator.js';
import ShowPassword from './js/show-password.js';
import SignupForm from './js/signup-form.js';
import Dropdown from './js/dropdown.js';
import ProfileForm from './js/profile-form.js';

import industry from './js/data/industry.js';
import responsibility from './js/data/responsibility.js';
import position from './js/data/position.js';

FormValidator.init();
ShowPassword.init();
SignupForm.init();
Dropdown.init([industry, responsibility, position]);
ProfileForm.init();