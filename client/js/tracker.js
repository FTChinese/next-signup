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
		switch (target.type) {
			case 'text':
			case 'radio':
				eventAction = '/Register/Select/' + target.name;
				break;

			case 'checkbox':
				target.checked 
				? eventAction = '/Register/Check/' + target.name
				: eventAction = '/Register/Uncheck/' + target.name;
				break;
		}
		// ga('send', {
		// 	hitType: 'event',
		// 	eventCategory: 'signup',
		// 	eventAction: eventAction
		// });
		ga('set', 'page', eventAction);
		ga('send', 'pageview');
	}

	handleSubmit(event) {
		const eventAction = '/Register/Submit/' + this.form.id;
		ga('set', 'page', eventAction);
		ga('send', 'pageview');
	}
}
export default Tracker;