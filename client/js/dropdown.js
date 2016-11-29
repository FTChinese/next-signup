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
		this.isValid = true;
		this.data = data;

		const list = buildList(this.data, null);
		this.dropdownEl.appendChild(list);

		this.select = this.select.bind(this);
		this.targetEl.addEventListener('click', this.select);
		// console.log('add change event');
		// this.inputEl.addEventListener('change', (e) => {
		// 	console.log(this.inputEl.value);
		// });

		this.onEls = [];
		this.rootEl.setAttribute('data-dropdown--js', 'true');
	}

	toggle(e) {
		super.toggle(e);
// this.state inherited from Toggle.
// this.state = true if menu opens. Whatever error message visible should be hidden.
		if (this.state) {			
			this.removeValidityFlag();
		}		
// If data search reaches the end, remove any `data-error` attributes, else add `data-error=imcomplete`.
		if (this.isValid) {
			this.flagAsValid();
			return;
		}

// Only when not complete and dropdown is not open should you proceed here.
		this.flagAsInvalid();
// What if user opened the dropdown, not complete selection but left?	
	}

	select(e) {
		if (!e.target.hasAttribute('data-order')) {
			return;
		}

		const target = e.target;
		const order = target.getAttribute('data-order').split('-');

		const value = search(this.data, order);
// You should manually dispatch change event to inputEl when value set programaticlly.
		this.inputEl.value = value.history.join(',');
		if (value.children) {
			console.log('selection not complete');
			this.isValid = false;
			this.toggleSubmenu(target, order);
			return;
		}
		console.log('selection complete');
// selection complete, dispatching complete event to inputEl, set isValid to true, close dropdown, close all submenu.
		dispatchChangeEventTo(this.inputEl);
		this.isValid = true;		
		this.toggle(e);
		this.closeSubmenu();
	}

	toggleSubmenu(target, order) {
		const index = order.length - 1;
//remove all element in onEls after `index`, and remove their class name `on`
// If selected element on the same level as the previous one, this should not execute;
		for (let i = this.onEls.length; i > order.length ; i--) {
			const onEl = this.Els.pop();
			onEl.classList.remove('on');
		}
		
// If clicked on the same element, toggle class name `on`, stops.

		if (this.onEls[index] === target) {
			target.classList.toggle('on');
			console.log('clicked on the same element');
			return;
		}
// If not the same element, add `on`;
		target.classList.add('on');
		console.log('clicked on a different element than the prvious one');
// If opened another element on the same level, remove `on`. Otherwise it indicate you are clicking element on this level for the first time, it does not exist yet.	
		if (this.onEls[index]) {
			console.log('There are old elements on position: ', index, '.hide it.');
			this.onEls[index].classList.remove('on');
		}

		console.log('put new element on postion: ', index);
		this.onEls[index] = target;
		
		return;
	}

	closeSubmenu() {
		// empty traverseTree and remove `on`.
		for (let i = this.onEls.length; i > 0 ; i--) {
			const onEl = this.onEls.pop();
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

function dispatchChangeEventTo(target) {
	const event = new Event('change', {
		bubbles: true,
		cancelable: true
	});
	target.dispatchEvent(event);
};

export default Dropdown;