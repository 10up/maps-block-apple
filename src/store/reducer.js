/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Reducer managing the mapkit authentication
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function authenticationReducer(state, action) {
	switch (action.type) {
		case 'UPDATE_AUTHENTICATION':
			return {
				...state,
				authenticated: action.isAuthenticated,
			};
		default:
			return state;
	}
}

export default combineReducers({
	authenticationReducer,
});
