/**
 * Returns an action object used in signalling that the authentication state has changed
 *
 * @param {object} isAuthenticated status
 *
 * @returns {object} Action object.
 */
export function updateAuthenticationStatus(isAuthenticated) {
	return {
		type: 'UPDATE_AUTHENTICATION',
		isAuthenticated,
	};
}
