<?php
/**
 * Plugin Name: Apple Maps For Wordpress
 * Plugin URI: https://10up.com
 * Description:
 * Version:     0.1.0
 * Author:      10up
 * Author URI:  https://10up.com
 * Text Domain: apple-maps-for-wordpress
 * Domain Path: /languages
 */

// Useful global constants
define( 'APPLE_MAPS_FOR_WORDPRESS_VERSION', '0.1.0' );
define( 'APPLE_MAPS_FOR_WORDPRESS_URL',     plugin_dir_url( __FILE__ ) );
define( 'APPLE_MAPS_FOR_WORDPRESS_PATH',    dirname( __FILE__ ) . '/' );
define( 'APPLE_MAPS_FOR_WORDPRESS_INC',     APPLE_MAPS_FOR_WORDPRESS_PATH . 'includes/' );

// Include files
require_once APPLE_MAPS_FOR_WORDPRESS_INC . 'functions/core.php';


// Activation/Deactivation
register_activation_hook( __FILE__, '\AppleMapsForWordpress\Core\activate' );
register_deactivation_hook( __FILE__, '\AppleMapsForWordpress\Core\deactivate' );

// Bootstrap
AppleMapsForWordpress\Core\setup();
