<?php
/**
 * Register Block Assets
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

add_action( 'init', __NAMESPACE__ . '\register_block_assets' );
/**
 * Regiister block assets
 */
function register_block_assets() {

	wp_enqueue_script( 'apple-mapkit-js', 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', [], 5, false );

	$file_name           = 'index';
	$script_dependencies = ( include MAPS_BLOCK_APPLE_PATH . "build/$file_name.asset.php" );
	wp_register_script(
		'maps-block-apple-block',
		MAPS_BLOCK_APPLE_URL . "build/$file_name.js",
		array_merge( $script_dependencies['dependencies'], [ 'apple-mapkit-js' ] ),
		$script_dependencies['version'],
		false
	);

	wp_register_style(
		'maps-block-apple-style',
		MAPS_BLOCK_APPLE_URL . 'style.css',
		[],
		$script_dependencies['version']
	);

	wp_register_style(
		'maps-block-apple-editor-style',
		MAPS_BLOCK_APPLE_URL . 'editor.css',
		[],
		$script_dependencies['version']
	);

	register_block_type(
		'tenup/maps-block-apples',
		[
			'editor_script' => 'maps-block-apple-block',
			'editor_style'  => 'maps-block-apple-editor-style',
			'style'         => 'maps-block-apple-style',
		]
	);

}

add_action( 'init', __NAMESPACE__ . '\register_frontend_assets' );
/**
 * Regiister block assets
 */
function register_frontend_assets() {
	// If in the backend, bail out.
	if ( is_admin() ) {
		return;
	}

	$file_name             = 'frontend';
	$frontend_dependencies = ( include MAPS_BLOCK_APPLE_PATH . "build/$file_name.asset.php" );
	wp_enqueue_script(
		'maps-block-apple-frontend',
		MAPS_BLOCK_APPLE_URL . "build/$file_name.js",
		array_merge( $frontend_dependencies['dependencies'], [ 'apple-mapkit-js' ] ),
		$frontend_dependencies['version'],
		false
	);
}
