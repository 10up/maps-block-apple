<?php
/**
 * Plugin Name:       Block for Apple Maps
 * Plugin URI:        https://github.com/10up/maps-block-apple
 * Description:       An Apple Maps block for the WordPress block editor (Gutenberg).
 * Version:           1.1.4
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            10up
 * Author URI:        https://10up.com
 * License:           GPL-2.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-2.0-or-later.html
 * Text Domain:       maps-block-apple
 *
 * @package           tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

// Useful global constants.
define( 'MAPS_BLOCK_APPLE_VERSION', '1.1.4' );
define( 'MAPS_BLOCK_APPLE_URL', plugin_dir_url( __FILE__ ) );
define( 'MAPS_BLOCK_APPLE_PATH', dirname( __FILE__ ) . '/' );
define( 'MAPS_BLOCK_APPLE_INC', MAPS_BLOCK_APPLE_PATH . 'includes/' );
define( 'MAPS_BLOCK_APPLE_BASENAME', plugin_basename( __FILE__ ) );


// Validate Environment.
$is_environment_satisfy = require MAPS_BLOCK_APPLE_INC . 'environment-validation.php';
if ( ! $is_environment_satisfy ) {
	return;
}


/**
 * Add options
 */
function add_options() {
	add_option( 'maps_block_apple_team_id' );
	add_option( 'maps_block_apple_key_id' );
	add_option( 'maps_block_apple_private_key' );
}
add_action( 'init', __NAMESPACE__ . '\add_options' );

require_once MAPS_BLOCK_APPLE_INC . 'block-assets.php';
require_once MAPS_BLOCK_APPLE_INC . 'rest-routes.php';
require_once MAPS_BLOCK_APPLE_INC . 'settings.php';

// Initialize the settings page.
Settings\setup();
