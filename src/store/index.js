/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

const STORE_NAME = 'tenup/maps-block-apple';

/**
 * Store definition for the icons namespace.
 *
 * @type {Object}
 */
export const store = createReduxStore(STORE_NAME, {
	reducer,
	selectors,
	actions,
});

register(store);
