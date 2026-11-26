/**
 * Apple Maps block content as the latest release saved it.
 *
 * The markup is what the tagged release's `src/save.js` produces for the
 * attributes in its block comment (`git show <tag>:src/save.js`).
 */

/** Attributes the fixture stores, besides the block defaults. */
export const SAVED_ATTRIBUTES = {
	latitude: 40.7128,
	longitude: -74.006,
	zoom: 12,
	height: '300',
	mapType: 'hybrid',
};

/**
 * Saved by 1.1.6 (`1.1.6:src/save.js`): height through the block wrapper's
 * style, and a marker with a custom glyph image (`data-glyph-image`).
 */
export const CONTENT_1_1_6 =
	'<!-- wp:tenup/maps-block-apple {"height":"300","latitude":40.7128,"longitude":-74.006,"zoom":12,"mapType":"hybrid","markers":[{"latitude":40.7128,"longitude":-74.006,"title":"Office","subtitle":"Head office","color":"red","glyphColor":"white","glyphImage":"/wp-content/uploads/pin.png"}]} -->\n' +
	'<div class="wp-block-tenup-maps-block-apple" style="height:300px" data-map-type="hybrid" data-latitude="40.7128" data-longitude="-74.006" data-rotation="0" data-zoom="12" data-shows-map-type-control="true" data-is-rotation-enabled="true" data-shows-compass="adaptive" data-is-zoom-enabled="true" data-shows-zoom-control="true" data-is-scroll-enabled="true" data-shows-scale="adaptive"><div class="marker-annotation" data-latitude="40.7128" data-longitude="-74.006" data-title="Office" data-subtitle="Head office" data-color="red" data-glyph-color="white" data-glyph-image="/wp-content/uploads/pin.png"></div></div>\n' +
	'<!-- /wp:tenup/maps-block-apple -->';
