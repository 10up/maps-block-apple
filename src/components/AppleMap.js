/*global mapkit*/

import apiFetch from '@wordpress/api-fetch';

export default class AppleMap {
	constructor( element ) {
		this.element = element;

		this.init();
	}

	init() {
		mapkit.init( {
			authorizationCallback( done ) {
				apiFetch( { path: 'AppleMapsWordPress/v1/GetJWT/' } )
					.then( done )
					.catch( console.error );
			},
		} );
	}
}
