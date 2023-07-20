<?php
/**
 * Plugin Name:       Block for Apple Maps
 * Plugin URI:        https://github.com/10up/maps-block-apple
 * Description:       An Apple Maps block for the WordPress block editor (Gutenberg).
 * Version:           1.1.2
 * Requires at least: 5.8
 * Requires PHP:      7.4
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
define( 'MAPS_BLOCK_APPLE_VERSION', '1.1.2' );
define( 'MAPS_BLOCK_APPLE_URL', plugin_dir_url( __FILE__ ) );
define( 'MAPS_BLOCK_APPLE_PATH', dirname( __FILE__ ) . '/' );
define( 'MAPS_BLOCK_APPLE_INC', MAPS_BLOCK_APPLE_PATH . 'includes/' );
define( 'MAPS_BLOCK_APPLE_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Get the minimum version of PHP required by this plugin.
 *
 * @since 1.1.2
 *
 * @return string Minimum version required.
 */
function minimum_php_requirement() {
	return '7.4';
}

/**
 * Whether PHP installation meets the minimum requirements
 *
 * @since 1.1.2
 *
 * @return bool True if meets minimum requirements, false otherwise.
 */
function site_meets_php_requirements() {
	return version_compare( phpversion(), minimum_php_requirement(), '>=' );
}

// Ensuring our PHP version requirement is met first before loading plugin.
if ( ! site_meets_php_requirements() ) {
	add_action(
		'admin_notices',
		function() {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					echo wp_kses_post(
						sprintf(
							/* translators: %s: Minimum required PHP version */
							__( 'Block for Apple Maps requires PHP version %s or later. Please upgrade PHP or disable the plugin.', 'maps-block-apple' ),
							esc_html( minimum_php_requirement() )
						)
					);
					?>
				</p>
			</div>
			<?php
		}
	);
	return;
}

/**
 * Require WP version >=5.8
 * PHP 7.4 errors should be caught in the sandbox during activation.
 */
register_activation_hook(
	__FILE__,
	function() {
		if ( ! version_compare( $GLOBALS['wp_version'], '5.8', '>=' ) ) {
			wp_die(
				esc_html__( 'Block for Apple Maps requires WordPress version 5.8 or greater.', 'maps-block-apple' ),
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

require_once MAPS_BLOCK_APPLE_INC . 'block-assets.php';
require_once MAPS_BLOCK_APPLE_INC . 'rest-routes.php';
require_once MAPS_BLOCK_APPLE_INC . 'settings.php';

// Initialize the settings page.
Settings\setup();
