/**
 * Returns authentication state
 *
 * @param {Object} state Data state.
 *
 * @return {Array?} Icon Sets.
 */
export function isAuthenticated(state) {
	return Boolean(state?.authenticationReducer?.authenticated);
}
