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
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_styles' ) );

	// Gutenberg Editor assets.
	add_action( 'enqueue_block_editor_assets', $n('enqueue_ad_block_editor_assets' ) );
	// Gutenberg Front End Assets.
	add_action( 'enqueue_block_assets', $n('enqueue_ad_block_assets' ) );

	// Editor styles. add_editor_style() doesn't work outside of a theme.
	add_filter( 'mce_css', $n( 'mce_css' ) );

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
	// First load the init scripts in case any rewrite functionality is being loaded
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
 * Generate an URL to a script, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $script Script file name (no .js extension)
 * @param string $context Context for the script ('admin', 'frontend', or 'shared')
 *
 * @return string|WP_Error URL
 */
function script_url( $script, $context ) {

	if( !in_array( $context, ['admin', 'frontend', 'shared','gutenberg'], true) ) {
		error_log('Invalid $context specfied in AppleMapsForWordpress script loader.');
		return '';
	}

	return ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
		APPLE_MAPS_FOR_WORDPRESS_URL . "assets/js/${context}/{$script}.js" :
		APPLE_MAPS_FOR_WORDPRESS_URL . "dist/js/${context}.min.js" ;

}

/**
 * Generate an URL to a stylesheet, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $stylesheet Stylesheet file name (no .css extension)
 * @param string $context Context for the script ('admin', 'frontend', or 'shared')
 *
 * @return string URL
 */
function style_url( $stylesheet, $context ) {

	if( !in_array( $context, ['admin', 'frontend', 'shared'], true) ) {
		error_log('Invalid $context specfied in AppleMapsForWordpress stylesheet loader.');
		return '';
	}

	return ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
		APPLE_MAPS_FOR_WORDPRESS_URL . "assets/css/${context}/{$stylesheet}.css" :
		APPLE_MAPS_FOR_WORDPRESS_URL . "dist/css/${stylesheet}.min.css" ;

}

/**
 * Enqueue scripts for front-end.
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script(
		'apple_maps_for_wordpress_shared',
		script_url( 'shared', 'shared' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

	wp_enqueue_script(
		'apple_maps_for_wordpress_frontend',
		script_url( 'frontend', 'frontend' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

}

/**
 * Enqueue scripts for admin.
 *
 * @return void
 */
function admin_scripts() {

	wp_enqueue_script(
		'apple_maps_for_wordpress_shared',
		script_url( 'shared', 'shared' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

	wp_enqueue_script(
		'apple_maps_for_wordpress_admin',
		script_url( 'admin', 'admin' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

}

/**
 * Enqueue styles for front-end.
 *
 * @return void
 */
function styles() {

	wp_enqueue_style(
		'apple_maps_for_wordpress_shared',
		style_url( 'shared-style', 'shared' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION
	);

	if( is_admin() ) {
		wp_enqueue_script(
			'apple_maps_for_wordpress_admin',
			style_url( 'admin-style', 'admin' ),
			[],
			APPLE_MAPS_FOR_WORDPRESS_VERSION,
			true
		);
	}
	else {
		wp_enqueue_script(
			'apple_maps_for_wordpress_frontend',
			style_url( 'style', 'frontend' ),
			[],
			APPLE_MAPS_FOR_WORDPRESS_VERSION,
			true
		);
	}

}

/**
 * Enqueue styles for admin.
 *
 * @return void
 */
function admin_styles() {

	wp_enqueue_style(
		'apple_maps_for_wordpress_shared',
		style_url( 'shared-style', 'shared' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION
	);

	wp_enqueue_script(
		'apple_maps_for_wordpress_admin',
		style_url( 'admin-style', 'admin' ),
		[],
		APPLE_MAPS_FOR_WORDPRESS_VERSION,
		true
	);

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
		'map-block', // Handle.
		script_url( 'gutenberg', 'gutenberg' ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
	);
	
	//wp_localize_script( 'map-block', 'adBlock', get_ad_data() );
	
	// Styles.
//	wp_enqueue_style(
//		'map-block-editor', // Handle.
//		plugins_url( 'assets/css/blocks.editor.css', dirname( __FILE__ ) ), // Block editor CSS.
//		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
//		filemtime( plugin_dir_path( dirname( __FILE__ ) ) . '/assets/css/blocks.editor.css' ) // filemtime — Gets file modification time.
//	);
}

function enqueue_ad_block_assets() {

}

/**
 * Enqueue editor styles. Filters the comma-delimited list of stylesheets to load in TinyMCE.
 *
 * @param string $stylesheets Comma-delimited list of stylesheets.
 * @return string
 */
function mce_css( $stylesheets ) {
	if ( ! empty( $stylesheets ) ) {
		$stylesheets .= ',';
	}

	return $stylesheets . APPLE_MAPS_FOR_WORDPRESS_URL . ( ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
			'assets/css/frontend/editor-style.css' :
			'dist/css/editor-style.min.css' );
}
