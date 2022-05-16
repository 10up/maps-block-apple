/* eslint jsdoc/check-tag-names: "warn" */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const statusEl = document.getElementById('mapkit-credentials-status');
const privateKeyInput = document.getElementById('token-gen-authkey');
const keyIdInput = document.getElementById('token-gen-kid');
const teamIdInput = document.getElementById('token-gen-iss');

if (!privateKeyInput.value && !keyIdInput.value && !teamIdInput.value) {
	statusEl.closest('tr').style.display = 'none';
} else {
	setTimeout(() => {
		apiFetch({ path: 'MapsBlockApple/v1/GetJWT/'})
			.then((token) => {
				mapkit.init({
					authorizationCallback(done) {
						done(token);
					},
				});
			})
			.catch((error) => {
				addNotice(error.message, 'error');
			});
	}, 300);
}

mapkit.addEventListener('error', () => {
	addNotice(__('Invalid credentials!'), 'error')
});

mapkit.addEventListener('configuration-change', () => {
	addNotice(__('Authorized!'), 'valid');
});

/**
 *
 * @param {string} message Notice message.
 * @param {string} type    Notice type. error|valid.
 * @yields
 */
const addNotice = (message, type) => {
	statusEl.className = '';
	statusEl.classList.add(`mapkit-${type}`);
	statusEl.innerText = message;
};
