import setDefault from './set-default.js';
class Tracker {
	constructor(settings={}) {
		setDefault(settings).to({
			selector: '',
			formClass: 'su-form',
			btnClass: 'su-btn'
		})
		this.form = settings.selector.length
					? document.querySelector(settings.selector)
					: document.querySelector(`.${settings.formClass}`);

		this.btn = this.form.querySelector(`.${settings.btnClass}`);

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.btn.addEventListener('click', this.handleSubmit);
	}

	uponInput() {
		this.form.addEventListener('change', this.handleInput);
	}

	handleInput(event) {
		if (event.target.tagName !== 'INPUT') {
			return;
		}
		let eventAction = '';
		const target = event.target;
		console.log(target);
		switch (target.type) {
			case 'text':
			case 'radio':
				eventAction = 'Select ' + target.name;
				break;

			case 'checkbox':
				target.checked 
				? eventAction = 'Check ' + target.name
				: eventAction = 'Uncheck ' + target.name;
				break;
		}
		ga('send', {
			hitType: 'event',
			eventCategory: 'signup',
			eventAction: eventAction
		});
	}

	handleSubmit(event) {
		const eventAction = 'Submit ' + this.form.id;
		ga('send', {
			hitType: 'event',
			eventCategory: 'signup',
			eventAction: eventAction
		});
	}
}
export default Tracker;