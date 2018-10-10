/*global wp*/
const { registerStore } = wp.data;
const defaultState = {
	auth: true,
	ready: false
};

const reducer = ( state = defaultState, action ) => {

	switch( action.type ) {
			case 'APPLE_MAP_AUTH_FAILED':
				state =  {
					auth: false,
					ready: false,
					error: action.reason
				};
				break;
			case 'APPLE_MAP_KIT_READY':
				state =  {
					ready: true,
					auth: true
				};
				break;
	}
	return state;
};

const getAppleMapsState = state => {
	return state;
};

const getAuthErrorMessage = state => {
	return state.reason;
};

const authFailed = ( data ) => {
	return {
		type: 'APPLE_MAP_AUTH_FAILED',
		reason: data.reason
	};
};

const mapKitReady = () => {
	return {
		type: 'APPLE_MAP_KIT_READY'
	};
};


const appleStore = registerStore( 'apple-maps-for-wordpress', {
	reducer,
	selectors: { getAppleMapsState, getAuthErrorMessage },
	actions: { mapKitReady, authFailed }
} );

export default appleStore;
