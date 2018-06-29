/*global wp,mapkit*/
/*eslint-disable no-unused-vars*/
const { dispatch, select, subscribe, registerStore } = wp.data;

const reducer = ( state = [], action ) => {
	if ( action.type === 'APPLE_MAP_INIT' ) {
		const map = new mapkit.Map( document.getElementById( action.map.mapID ) );
		console.log( map );
	}
	return state;
};

const getAppleMaps = state => {
	return state;
};

const initMap = mapID => {
	return {
		type: 'APPLE_MAP_INIT',
		map: { mapID }
	};
};


registerStore( 'apple-maps-for-wordpress', {
	reducer,
	selectors: { getAppleMaps },
	actions: { initMap }
} );
