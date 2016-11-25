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

	'length': function (value, input) {

		if(!value) {
			return true;
		}

		const min = parseInt(input.getAttribute('minlength') || 0, 10);
		const max = parseInt(input.getAttribute('maxlength'), 10);

		const lengthOk = value.length >= min && value.length <= max;
		return lengthOk;
	},

	'checked': function (value, input) {
		return input.checked;
	}
};

export default validators;
