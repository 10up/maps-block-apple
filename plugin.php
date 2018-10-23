<?php
/**
 * Plugin Name: Apple Maps for WordPress
 * Plugin URI: https://10up.com
 * Description: Registers an Apple Maps WordPress Block to bring the power of Apple Maps to your WordPress website.
 * Version:     0.1.0
 * Author:      10up
 * Author URI:  https://10up.com
 * Text Domain: apple-maps-for-wordpress
 * Domain Path: /languages
 */

// Useful global constants.
define( 'APPLE_MAPS_FOR_WORDPRESS_VERSION', '0.1.0' );
define( 'APPLE_MAPS_FOR_WORDPRESS_URL', plugin_dir_url( __FILE__ ) );
define( 'APPLE_MAPS_FOR_WORDPRESS_PATH', dirname( __FILE__ ) . '/' );
define( 'APPLE_MAPS_FOR_WORDPRESS_INC', APPLE_MAPS_FOR_WORDPRESS_PATH . 'includes/' );
define( 'APPLE_MAPS_FOR_WORDPRESS_BASENAME', plugin_basename( __FILE__ ) );

// Include files.
require_once APPLE_MAPS_FOR_WORDPRESS_INC . 'functions/core.php';
require_once APPLE_MAPS_FOR_WORDPRESS_INC . 'functions/settings.php';
require_once APPLE_MAPS_FOR_WORDPRESS_INC . 'functions/gutenberg.php';



// Activation/Deactivation.
register_activation_hook( __FILE__, '\AppleMapsForWordpress\Core\activate' );
register_deactivation_hook( __FILE__, '\AppleMapsForWordpress\Core\deactivate' );

// Bootstrap.
AppleMapsForWordpress\Core\setup();
AppleMapsForWordpress\Settings\setup();
AppleMapsForWordpress\Gutenberg\setup();
