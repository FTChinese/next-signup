import Baseform from './base-form.js';
import ErrorMessage from './error-message.js';

class Checked extends Baseform {
	constructor(rootEl) {
		super(rootEl);

		this.inputEl = this.rootEl.querySelector('.o-forms__checkbox');

		this.name = this.inputEl.name;
		this.patterns = this.inputEl.getAttribute('pattern').split(',').map((p) => p.trim());
		this.error = new ErrorMessage(this.rootEl);
		
		this.inputEl.addEventListener('focus', this.handleFocus);
	}
}

export default Checked;