<?php
/**
 * Uninstaller
 *
 * @package tenup\Maps_Block_Apple
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}

// Remove MapKit credentials on uninstall.
delete_option( 'maps_block_apple' );
delete_site_option( 'maps_block_apple' );
