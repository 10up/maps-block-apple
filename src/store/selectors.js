/**
 * Returns authentication state
 *
 * @param {object} state Data state.
 *
 * @returns {Array?} Icon Sets.
 */
export function isAuthenticated(state) {
	return Boolean(state?.authenticationReducer?.authenticated);
}
