<?php
namespace AppleMapsForWordpress\Core;

/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );

	do_action( 'apple_maps_for_wordpress_loaded' );
}

/**
 * Registers the default textdomain.
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'apple-maps-for-wordpress' );
	load_textdomain( 'apple-maps-for-wordpress', WP_LANG_DIR . '/apple-maps-for-wordpress/apple-maps-for-wordpress-' . $locale . '.mo' );
	load_plugin_textdomain( 'apple-maps-for-wordpress', false, plugin_basename( APPLE_MAPS_FOR_WORDPRESS_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @return void
 */
function init() {
	do_action( 'apple_maps_for_wordpress_init' );
}

/**
 * Activate the plugin
 *
 * @return void
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded.
	init();
	flush_rewrite_rules();
}

/**
 * Deactivate the plugin
 *
 * Uninstall routines should be in uninstall.php
 *
 * @return void
 */
function deactivate() {

}

/**
 * Keep the contexts in a single source.
 *
 * @return array
 */
function get_enqueue_contexts() {
	return [ 'admin', 'frontend', 'shared', 'gutenberg' ];
}

/**
 * Generate an URL to a script, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $script Script file name (no .js extension).
 * @param string $context Context for the script ('admin', 'frontend', or 'shared').
 *
 * @return string|\WP_Error URL
 */
function script_url( $script, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return '';
	}

	return ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
		APPLE_MAPS_FOR_WORDPRESS_URL . "assets/js/${context}/{$script}.js" :
		APPLE_MAPS_FOR_WORDPRESS_URL . "dist/js/${context}.min.js";

}

/**
 * Generate an URL to a stylesheet, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $stylesheet Stylesheet file name (no .css extension).
 * @param string $context    Context for the script ('admin', 'frontend', or 'shared').
 *
 * @return string URL
 */
function style_url( $stylesheet, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return '';
	}

	return ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
		APPLE_MAPS_FOR_WORDPRESS_URL . "assets/css/${context}/{$stylesheet}.css" :
		APPLE_MAPS_FOR_WORDPRESS_URL . "dist/css/${stylesheet}.min.css";

}

/**
 * Enqueue scripts for front-end.
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script( 'mapkitjs', 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', [], false );

	wp_enqueue_script(
		'apple_maps_for_wordpress_shared',
		script_url( 'shared', 'shared' ),
		[ 'mapkitjs' ],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

	// Localize the script so we can have access to the settings.
	$settings = get_option( 'amfwp_settings', [] );
	wp_localize_script( 'mapkitjs', 'AMFWP', [ 'longLifeToken' => $settings['long_life_token'] ] );
}

/**
 * Enqueue scripts for admin.
 *
 * @param string $hook The suffix for the current admin page.
 *
 * @return void
 */
function admin_scripts( $hook ) {

	// MapKit scripts for the Post admin screen.
	$settings = get_option( 'amfwp_settings', [] );

	// Post edit screen only.
	if ( ! empty( $settings ) && in_array( $hook, [ 'post.php', 'post-new.php' ], true ) ) {
		wp_enqueue_script(
			'apple_maps_for_wordpress_shared',
			script_url( 'shared', 'shared' ),
			[],
			APPLE_MAPS_FOR_WORDPRESS_VERSION,
			true
		);

		wp_enqueue_script( 'mapkitjs', 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', [], false );

		// Localize the script so we can have access to the settings.
		wp_localize_script( 'mapkitjs', 'AMFWP', [
			'longLifeToken' => $settings['long_life_token'],
		] );
	}

	// Add the admin script for the settings page only.
	if ( 'settings_page_apple-maps-wordpress' === $hook ) {
		wp_enqueue_script(
			'apple_maps_for_wordpress_admin',
			script_url( 'admin', 'admin' ),
			[],
			APPLE_MAPS_FOR_WORDPRESS_VERSION,
			true
		);
		wp_localize_script( 'apple_maps_for_wordpress_admin', 'AMFWP_ADMIN', [
			'origin'      => get_home_url(),
			'buttonTexts' => [
				'hideLongLifeToken' => __( 'Hide Long Life Token', 'apple-maps-for-wordpress' ),
				'showLongLifeToken' => __( 'Show Long Life Token', 'apple-maps-for-wordpress' ),
				'showAuthKey'       => __( 'Show MapKit JS Key', 'apple-maps-for-wordpress' ),
				'hideAuthKey'       => __( 'Hide MapKit JS Key', 'apple-maps-for-wordpress' ),
			],
		] );
	}
}
