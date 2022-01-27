/**
 * Returns an action object used in signalling that the authentication state has changed
 *
 * @param {boolean} isAuthenticated status
 *
 * @return {Object} Action object.
 */
export function updateAuthenticationStatus(isAuthenticated) {
	return {
		type: 'UPDATE_AUTHENTICATION',
		isAuthenticated,
	};
}
