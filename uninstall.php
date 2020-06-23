<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}

$option_name = 'maps_block_apple';

// Remove MapKit credentials on uninstall.
delete_option( $option_name );
