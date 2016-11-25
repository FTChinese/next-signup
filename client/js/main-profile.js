import Checked from './checked.js';
import Dropdown from './dropdown.js';
import Validate from './validate.js';
import Submit from './submit.js';

import regions from './data/regions.js';
import sectors from './data/sectors.js';
import departments from './data/departments.js';
import posts from './data/posts.js';

// const checked = new Checked('#agreement-container');
Validate.init();

Dropdown.init('#profile-select', [regions, sectors, departments, posts]);

new Submit('#profile-basic', {
	callback: function(formEl) {
		console.log('profile-basic submitted');
	}
});

new Submit('#profile-select', {
	callback: function(formEl) {
		console.log('profile-select submitted');
	}
});

new Submit('#subscription', {
	callback: function(formEl) {
		console.log('subscription submitted');
	}
});