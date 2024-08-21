<?php
/**
 * Register Block Assets
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

add_action( 'init', __NAMESPACE__ . '\register_block_assets' );
/**
 * Register block assets
 */
function register_block_assets() {

	/**
	 * Admin Settings Page Style
	 */
	wp_register_style(
		'maps-block-apple-settings',
		trailingslashit( MAPS_BLOCK_APPLE_URL ) . 'assets/css/admin-maps-block-apple-settings.css',
		[],
		MAPS_BLOCK_APPLE_VERSION
	);

	/**
	 * Mapkit Library
	 */
	wp_register_script( 'apple-mapkit-js', 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', [], 5, false );

	/**
	 * Admin Settings Script
	 */
	$settings_file_name    = 'admin-settings';
	$settings_dependencies = ( include MAPS_BLOCK_APPLE_PATH . "build/$settings_file_name.asset.php" );
	wp_register_script(
		'maps-block-apple-settings',
		MAPS_BLOCK_APPLE_URL . "build/$settings_file_name.js",
		array_merge( $settings_dependencies['dependencies'], [ 'apple-mapkit-js' ] ),
		$settings_dependencies['version'],
		true
	);

	/**
	 * Block Editorial Script
	 */
	$block_file_name    = 'index';
	$block_dependencies = ( include MAPS_BLOCK_APPLE_PATH . "build/$block_file_name.asset.php" );
	wp_register_script(
		'maps-block-apple-block',
		MAPS_BLOCK_APPLE_URL . "build/$block_file_name.js",
		array_merge( $block_dependencies['dependencies'], [ 'apple-mapkit-js' ] ),
		$block_dependencies['version'],
		false
	);
	wp_localize_script(
		'maps-block-apple-block',
		'_mbaData',
		[
			'settingsURL' => admin_url( 'options-general.php?page=block-for-apple-maps' ),
		]
	);

	/**
	 * FE Block Script
	 */
	$fe_file_name          = 'frontend';
	$frontend_dependencies = ( include MAPS_BLOCK_APPLE_PATH . "build/$fe_file_name.asset.php" );
	wp_register_script(
		'maps-block-apple-frontend',
		MAPS_BLOCK_APPLE_URL . "build/$fe_file_name.js",
		array_merge( $frontend_dependencies['dependencies'], [ 'apple-mapkit-js' ] ),
		$frontend_dependencies['version'],
		false
	);

	register_block_type( MAPS_BLOCK_APPLE_PATH );

}

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\load_apple_map_script_in_iframe' );
/**
 * Load Apple MapKit script within the editor iframe.
 * This is required to ensure that the mapkit js script gets properly loaded inside the editor iframe.
 * It needs to be inside the iframe so the element we want to render the Map in is in the same window
 * as the mapkit script. Otherwise mapkit will throw an error saying it cannot find the element.
 */
function load_apple_map_script_in_iframe() {
	if ( ! is_admin() ) {
		return;
	}

	wp_enqueue_script( 'apple-mapkit-js' );
}

add_action( 'init', __NAMESPACE__ . '\set_script_translations' );
/**
 * Load translations.
 */
function set_script_translations() {
	wp_set_script_translations( 'maps-block-apple-block', 'maps-block-apple' );
}
