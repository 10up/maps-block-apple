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
 *
 * @package           tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

// Useful global constants.
define( 'MAPS_BLOCK_APPLE_VERSION', '0.1.0' );
define( 'MAPS_BLOCK_APPLE_URL', plugin_dir_url( __FILE__ ) );
define( 'MAPS_BLOCK_APPLE_PATH', dirname( __FILE__ ) . '/' );
define( 'MAPS_BLOCK_APPLE_INC', MAPS_BLOCK_APPLE_PATH . 'includes/' );
define( 'MAPS_BLOCK_APPLE_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Require PHP version 5.6 - throw an error if the plugin is activated on an older version.
 */
register_activation_hook(
	__FILE__,
	function() {
		if ( ! version_compare( $GLOBALS['wp_version'], '5.2', '>=' ) ) {
			wp_die(
				esc_html__( 'Block for Apple Maps requires WordPress version 5.2 or greater.', 'maps-block-apple' ),
				esc_html__( 'Error Activating', 'maps-block-apple' )
			);
		}
	}
);

/**
 * Add options
 */
function add_options() {
	add_option( 'maps_block_apple_team_id' );
	add_option( 'maps_block_apple_key_id' );
	add_option( 'maps_block_apple_private_key' );
}
add_action( 'init', __NAMESPACE__ . '\add_options' );

require_once MAPS_BLOCK_APPLE_INC . 'block_assets.php';
require_once MAPS_BLOCK_APPLE_INC . 'rest_routes.php';
