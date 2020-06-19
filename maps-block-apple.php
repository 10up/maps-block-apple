<?php
/**
 * Plugin Name:       Block for Apple Maps
 * Plugin URI:        https://github.com/10up/maps-block-apple
 * Description:       An Apple Maps block for the WordPress block editor (Gutenberg).
 * Version:           0.1.0
 * Requires at least: 5.2
 * Requires PHP:      5.6
 * Author:            10up
 * Author URI:        https://10up.com
 * License:           GPLv2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       maps-block-apple
 * Domain Path:       /languages
 *
 * @package           tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

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
