import domReady from '@wordpress/dom-ready';

import { AppleMap } from './components/AppleMap';

domReady(async () => {
	const appleMapsBlocks = document.querySelectorAll(
		'.wp-block-tenup-maps-block-apple'
	);

	if (!appleMapsBlocks.length) {
		return;
	}

	// don't initialize the frontend map in the editor
	if (document.body.classList.contains('editor-styles-wrapper')) {
		return;
	}

	AppleMap.authenticateMap();

	appleMapsBlocks.forEach((block) => {
		new AppleMap(block);
	});
});
