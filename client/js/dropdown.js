import Toggle from 'ftc-toggle';
import ErrorMessage from './error-message.js';
import {buildList, search} from './helper.js'

class Dropdown extends Toggle {
	constructor(rootEl, data, config={
		toggle: '.o-forms__text',
		menu: '.o-dropdown__menu'
	}) {
		if (!rootEl) {
			console.log('No root element!');
			return;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		const toggleEl = (config.toggle instanceof HTMLElement) ? config.toggle : rootEl.querySelector(config.toggle);
		const menuEl = (config.menu instanceof HTMLElement) ? config.menu : rootEl.querySelector(config.menu);

		super(toggleEl, {
			target: menuEl
		});

		this.error = new ErrorMessage(rootEl);
// a flag to indicate whether the nested data reaches end.
// Initailly it should be true. If user switched off the dropdown menu while selection does not reach the end, it is false and prevents submit.
		this.complete = true;
		this.data = data;

		const list = buildList(this.data, null);
		this.targetEl.appendChild(list);

		this.select = this.select.bind(this);
		this.targetEl.addEventListener('click', this.select);

		this.traverseTree = [];
		rootEl.setAttribute('data-o-dropdown--js', 'true');
	}

	toggle(e) {
		super.toggle(e);
// If data search reaches the end, remove any `data-error` attributes, else add `data-error=imcomplete`.
		if (this.complete) {
			this.toggleEl.removeAttribute('aria-invalid');
		} else {
			this.toggleEl.setAttribute('aria-invalid', 'true');
		}

// this.state = true if menu opens
// If menu opens, or selection complete, hide error.
		if (this.state || this.complete) {	
			this.error.clear();
		} else {
			this.error.setErrorText('complete');
			this.error.show();
		}
	}

	select(e) {
		
		if (e.target.hasAttribute('data-order')) {
			const target = e.target;
			const order = target.getAttribute('data-order').split('-');

			const value = search(this.data, order);
			console.log(value);
			this.toggleEl.value = value.history.join(' ');
			if (value.children) {
				console.log('selection not complete');
				this.complete = false;
				this.toggleSubmenu(target, order);
			} else {
				console.log('selection complete');
				// selection complete, trigger toggle();
				this.complete = true;
				this.toggle(e);
				this.closeSubmenu();
			}
		}
	}

	toggleSubmenu(target, order) {
		const index = order.length - 1;
	//remove all element in traverseTree after `index`, and remove theire class name `on`
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

	static init(el, dataArr) {
		const dropdowns = [];
		if (!el) {
			el = document.body
		} else if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}

		const dropdownEls = el.querySelectorAll('[data-o-component="o-dropdown"]');

		for (let i = 0; i < dropdownEls.length; i++) {
			if (!dropdownEls[i].hasAttribute('data-o-dropdown--js')) {
				dropdowns.push(new Dropdown(dropdownEls[i], dataArr[i]));
			}
		}

		return dropdowns;
	}
}

export default Dropdown;