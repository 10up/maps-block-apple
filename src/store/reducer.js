/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Reducer managing the mapkit authentication
 *
 * @param {object} state  Current state.
 * @param {object} action Dispatched action.
 *
 * @returns {object} Updated state.
 */
export function authenticationReducer(state, action) {
	switch (action.type) {
		case 'UPDATE_AUTHENTICATION':
			return {
				...state,
				authenticated: action.isAuthenticated
			};
		default:
			return state;
	}
}

export default combineReducers({
	authenticationReducer,
});
