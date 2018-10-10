<?php
namespace AppleMapsForWordpress\Gutenberg;
use AppleMapsForWordpress\Core as Core;

/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	// Gutenberg Editor assets.
	add_action( 'enqueue_block_editor_assets', $n('enqueue_ad_block_editor_assets' ) );
}




/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function enqueue_ad_block_editor_assets() {
	wp_enqueue_script(
		'apple-maps-wordpress-blocks', // Handle.
		Core\script_url( 'gutenberg', 'gutenberg' ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
	);
}
