import setDefault from './set-default.js';
// import Toggle from './toggle';
import {buildList, search} from './helper.js'

class Dropdown {
	constructor(rootEl, data, settings={}) {
		setDefault(settings).to({
			fieldInputClass: 'su-field__input',
			dropdownClass: 'su-field__dropdown',
			invalidClass: 'o-forms--error',
			validClass: 'o-forms--valid'
		});

		if (!rootEl) {
			console.log('No root element!');
			return;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		this.rootEl = rootEl;
		this.settings = settings;
		this.isValid = true;
		this.data = data;

		this.inputEl = rootEl.querySelector(`.${settings.fieldInputClass}`);
		this.dropdownEl = rootEl.querySelector(`.${settings.dropdownClass}`);

		
		// new Toggle(this.inputEl, {
		// 	target: this.dropdownEl,
		// 	callback: this.toggle
		// });	
		this.toggle = this.toggle.bind(this);
		this.inputEl.setAttribute('aria-expanded', 'false');
		this.inputEl.addEventListener('click', this.toggle);
// a flag to indicate whether the nested data reaches end.
// Initailly it should be true. If user switched off the dropdown menu while selection does not reach the end, it is false and prevents submit.

		const list = buildList(this.data, null);
		this.dropdownEl.appendChild(list);

		this.dropdownEl.setAttribute('aria-hidden', 'true');
		this.select = this.select.bind(this);
		this.dropdownEl.addEventListener('click', this.select);

		this.onEls = [];
		this.rootEl.setAttribute('data-dropdown--js', 'true');
	}

	toggle(e) {
		const state = this.dropdownEl.classList.toggle('o-toggle--active');
		this.inputEl.setAttribute('aria-expanded', state);
		this.dropdownEl.setAttribute('aria-hidden', !state);
		e && e.preventDefault();
// state  from Toggle.
// state = true if menu opens. Whatever error message visible should be hidden.
		console.log(state);
		if (state) {
			this.flagAsValid();
// You must stop here if the dropdown opens.
			return;
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
		console.log(e.target);
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
		this.toggle();
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
		console.log('removing class ', this.settings.invalidClass);
		console.log(this.rootEl.className);
		this.rootEl.classList.remove(this.settings.invalidClass);
	}

	flagAsInvalid () {
		this.rootEl.classList.add(this.settings.invalidClass);
		this.rootEl.classList.remove(this.settings.validClass);
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