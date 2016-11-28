import setDefault from './set-default.js';
import Toggle from 'ftc-toggle';
import {buildList, search} from './helper.js'

class Dropdown extends Toggle {
	constructor(rootEl, data, settings={}) {
		setDefault(settings).to({
			fieldInputClass: 'js-field__input',
			dropdownClass: 'js-field__dropdown',
			invalidClass: 'o-forms--error'
		});

		if (!rootEl) {
			console.log('No root element!');
			return;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		const inputEl = rootEl.querySelector(`.${settings.fieldInputClass}`);
		const dropdownEl = rootEl.querySelector(`.${settings.dropdownClass}`);

		super(inputEl, {
			target: dropdownEl
		});
		this.rootEl = rootEl;
		this.settings = settings;
		this.inputEl = inputEl;
		this.dropdownEl = dropdownEl;

		this.name = this.inputEl.name;
		
// a flag to indicate whether the nested data reaches end.
// Initailly it should be true. If user switched off the dropdown menu while selection does not reach the end, it is false and prevents submit.
		this.complete = true;
		this.data = data;

		const list = buildList(this.data, null);
		this.dropdownEl.appendChild(list);

		this.select = this.select.bind(this);
		this.targetEl.addEventListener('click', this.select);

		this.traverseTree = [];
		this.rootEl.setAttribute('data-dropdown--js', 'true');
	}

	toggle(e) {
		super.toggle(e);
// If data search reaches the end, remove any `data-error` attributes, else add `data-error=imcomplete`.
		if (this.complete) {
			this.flagAsValid();
			return;
		}

// this.state inherited from Toggle.
// this.state = true if menu opens. Whatever error message visible should be hidden.
		if (this.state) {			
			this.removeValidityFlag();
			return;		
		}
// Only when not complete and dropdown is not open should you proceed here.

		this.flagAsInvalid();
	}

	select(e) {
		if (!e.target.hasAttribute('data-order')) {
			return;
		}

		const target = e.target;
		const order = target.getAttribute('data-order').split('-');

		const value = search(this.data, order);

		this.inputEl.value = value.history.join(',');
		if (value.children) {
			console.log('selection not complete');
			this.complete = false;
			this.toggleSubmenu(target, order);
			return;
		}
		console.log('selection complete');
// select complete, record data.				
		localStorage.setItem(this.name, this.inputEl.value);
		console.log('recorded data:');
		console.log(localStorage.getItem(this.name));

		this.complete = true;
// selection complete, trigger toggle();		
		this.toggle(e);
		this.closeSubmenu();
	}

	toggleSubmenu(target, order) {
		const index = order.length - 1;
	//remove all element in traverseTree after `index`, and remove their class name `on`
		for (let i = this.traverseTree.length; i > order.length ; i--) {
			const onEl = this.traverseTree.pop();
			onEl.classList.remove('on');
		}
	// If clicked on the same element, toggle class name, else add `on` on target and replace element on the same index.
		if (this.traverseTree[index] !== target) {
			target.classList.add('on');
			this.traverseTree[index] = target;
		} else {
			target.classList.toggle('on');
		}	
	}

	closeSubmenu() {
		// empty traverseTree and remove `on`.
		for (let i = this.traverseTree.length; i > 0 ; i--) {
			const onEl = this.traverseTree.pop();
			onEl.classList.remove('on');
		}			
	}

	flagAsValid () {
		this.rootEl.classList.add(this.settings.validClass);
		this.rootEl.classList.remove(this.settings.invalidClass);
	}

	flagAsInvalid () {
		this.rootEl.classList.add(this.settings.invalidClass);
		this.rootEl.classList.remove(this.settings.validClass);
	}

	removeValidityFlag() {
		this.rootEl.classList.remove(this.settings.invalidClass);
		this.rootEl.classList.remove(this.settings.validClass);
	}

	static validateCompletion() {

	}

	static init(dataArr, el=document.body) {
		const dropdowns = [];
		if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}

		const dropdownEls = el.querySelectorAll('[data-component="dropdown"]');

		for (let i = 0; i < dropdownEls.length; i++) {
			if (!dropdownEls[i].hasAttribute('data-dropdown--js')) {
				dropdowns.push(new Dropdown(dropdownEls[i], dataArr[i]));
			}
		}

		return dropdowns;
	}
}

export default Dropdown;