import domReady from '@wordpress/dom-ready';

import AppleMap from './components/AppleMap';

domReady( () => {
	const appleMapsBlocks = document.querySelectorAll(
		'.wp-block-10up-apple-maps-wordpress'
	);

	appleMapsBlocks.forEach( ( block ) => {
		new AppleMap( block );
	} );
} );
