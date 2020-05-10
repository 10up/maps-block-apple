import domReady from '@wordpress/dom-ready';

import { AppleMap } from './components/AppleMap';

domReady( async () => {
	const appleMapsBlocks = document.querySelectorAll(
		'.wp-block-tenup-apple-maps-wordpress'
	);

	if ( ! appleMapsBlocks.length ) {
		return;
	}

	AppleMap.authenticateMap();

	appleMapsBlocks.forEach( ( block ) => {
		new AppleMap( block );
	} );
} );
