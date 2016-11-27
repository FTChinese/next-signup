import FormValidator from './js/form-validator.js';
import ShowPassword from './js/show-password.js';
import SignupForm from './js/signup-form.js';
import UnityInput from './js/unity-input.js';
// import ChatBox from './chat-box.js';
// import Submit from './submit.js';

FormValidator.init();
ShowPassword.init();
SignupForm.init();

new UnityInput('#unityInput', {
	form: '#signupForm'
});
// const accountForm = document.getElementById('create-account');
// const completeEl = document.getElementById('signup-complete');

// const email = new Validate('#email-container');

// const pw = new Validate('#pw-container');

// new ChatBox('#chatbox', {
// 	form: accountForm,
// 	source: [email, pw]
// });

// new Submit(accountForm, {
// 	required: [email, pw],
// 	callback: function(formEl) {
// 		formEl.setAttribute('aria-hidden', 'true');
// 		completeEl.setAttribute('aria-hidden', 'false');
// 	}
// });