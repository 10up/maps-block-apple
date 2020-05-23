<?php
/**
 * Plugin Name: Apple Maps WordPress
 * Plugin URI: https://10up.com
 * Description:
 * Version:     0.1.0
 * Author:      10up
 * Author URI:  https://10up.com
 * License:	GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: apple-maps-wordpress
 * Domain Path: /languages
 *
 * @package tenup\Apple_Maps_WordPress
 */

namespace tenup\Apple_Maps_WordPress;

// Useful global constants.
define( 'APPLE_MAPS_WORDPRESS_VERSION', '0.1.0' );
define( 'APPLE_MAPS_WORDPRESS_URL', plugin_dir_url( __FILE__ ) );
define( 'APPLE_MAPS_WORDPRESS_PATH', dirname( __FILE__ ) . '/' );
define( 'APPLE_MAPS_WORDPRESS_INC', APPLE_MAPS_WORDPRESS_PATH . 'includes/' );
define( 'APPLE_MAPS_WORDPRESS_BASENAME', plugin_basename( __FILE__ ) );

add_action( 'init', __NAMESPACE__ . '\add_options' );
/**
 * Add options
 */
function add_options() {
	add_option( 'apple_maps_wordpress_team_id' );
	add_option( 'apple_maps_wordpress_key_id' );
	add_option( 'apple_maps_wordpress_private_key' );
}

require_once APPLE_MAPS_WORDPRESS_INC . 'block_assets.php';
require_once APPLE_MAPS_WORDPRESS_INC . 'rest_routes.php';
