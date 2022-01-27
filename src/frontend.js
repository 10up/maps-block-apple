import domReady from '@wordpress/dom-ready';

import { AppleMap } from './components/AppleMap';

domReady(async () => {
	const appleMapsBlocks = document.querySelectorAll(
		'.wp-block-tenup-maps-block-apple'
	);

	if (!appleMapsBlocks.length) {
		return;
	}

	AppleMap.authenticateMap(window.mapkit);

	appleMapsBlocks.forEach((block) => {
		new AppleMap(block);
	});
});
