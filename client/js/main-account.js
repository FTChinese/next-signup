import Toggle from 'ftc-toggle';

import Baseform from './base-form.js';
import Validate from './validate.js';
import ChatBox from './chat-box.js';
import Submit from './submit.js';

new Toggle('#display-pw', {
	target: '#password',
	callback: function(state, e, targetEl) {
		console.log(state);
		if (state === 'open') {
			targetEl.setAttribute('type', 'text');
		} else {
			targetEl.setAttribute('type', 'password');
		}
	}
});

const accountForm = document.getElementById('create-account');
const completeEl = document.getElementById('signup-complete');

const email = new Validate('#email-container');

const pw = new Validate('#pw-container');

// new ChatBox('#chatbox', {
// 	form: accountForm,
// 	source: [email, pw]
// });

new Submit(accountForm, {
	required: [email, pw],
	callback: function(formEl) {
		formEl.setAttribute('aria-hidden', 'true');
		completeEl.setAttribute('aria-hidden', 'false');
	}
});

localStorage.setItem('chatbox_progress', 0);
if (localStorage.getItem('chatbox_progress')) {
	console.log(localStorage.getItem('chatbox_progress'));
}