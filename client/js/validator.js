const validators = {

	'required': function (value) {
		return value.length > 0;
	},

	'email': function (value) {
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(value);
	},

	'password': function (value) {

		const pattern = /^[A-Za-z0-9\\-]+$/;
		const lengthOk = value.length >= 6 && value.length <= 20;

		return pattern.test(value) && lengthOk;
	},

	'number': function (value, input) {

		if(!value) {
			return true;
		}

		// No longer using input.dataset as it fails in ie10
		const min = parseInt(input.getAttribute('data-min'), 10);
		const max = parseInt(input.getAttribute('data-max'), 10);

		const numberOk = !isNaN(parseFloat(value)) && isFinite(value);
		const lengthOk = value.length >= min && value.length <= max;

		return numberOk && lengthOk;
	},

	'date': function (value, input) {

		const pattern = /(\d{2})\/(\d{2})/;
		const match = pattern.test(value);

		// Check it matches 'xx/yy'
		if (!match){
			return false;
		}

		// Check that it's an actual date
		const dateValues = value.split('/');

		// 10/17 will evaluate to 1 _Nov_ 2017
		// or the first day in which the cc is _not_ valid
		const year = `20${dateValues[1]}`;
		const month = dateValues[0];

		if (parseInt(month, 10) <= 0 || parseInt(month, 10) > 12) {
			return false;
		}

		const date = new Date(year, month);

		if (isNaN(date.getDate())) {
			return false;
		}

		// Check it's a future date if required
		const now = new Date();

		return !(input.dataset.futureDate !== undefined && now.getTime() >= date.getTime());


	},

	'checked': function (value, input) {
		return input.checked;
	},

	'selected': function (value, input, group) {
		const radios = group.querySelectorAll('input[type=radio]');

		for (const i in radios) {
			if (radios[i].checked) {
				return true;
			}
		}

		return false;
	},

	'cc-number': function (value, input) {

		const validTypes = {
			visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
			amex: /^3[47][0-9]{13}$/,
			mastercard: /^5[1-5][0-9]{14}$/
		};

		for (const ccType of input.dataset.ccType.split(',')) {
			if (validTypes[ccType] && validTypes[ccType].test(value)) {
				return true;
			}
		}

		return false;
	}
};

export default validators;
