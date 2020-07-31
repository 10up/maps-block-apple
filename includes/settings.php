<?php
/**
 * Setting page
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Settings;

/**
 * Setup settings
 *
 * @since 1.0.0
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};
	add_action( 'admin_init', $n( 'register_settings' ) );
	add_action( 'rest_api_init', $n( 'register_settings' ) );
}

/**
 * Helper to retrieve a setting.
 *
 * @param string $setting The name of the setting.
 * @return mixed
 */
function get_setting( $setting ) {
	$settings = get_option( 'maps_block_apple', [] );
	return isset( $settings[ $setting ] ) ? $settings[ $setting ] : '';
}

/**
 * Register settings for options table
 *
 * @since  1.0
 */
function register_settings() {
	register_setting(
		'maps_block_apple',
		'maps_block_apple',
		array(
			'show_in_rest'      => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'private_key' => array(
							'type' => 'string',
						),
						'team_id'     => array(
							'type' => 'string',
						),
						'key_id'      => array(
							'type' => 'string',
						),
					),
				),
			),
			'default'           => [],
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_settings',
		)
	);
}

/**
 * Sanitize settings for DB
 *
 * @param array $settings The array of setting to sanitize.
 *
 * @return array
 * @since  1.0
 */
function sanitize_settings( $settings ) {
	$new_settings = [];
	if ( isset( $settings['private_key'] ) ) {
		$new_settings['private_key'] = trim( $settings['private_key'] );
	}

	if ( isset( $settings['key_id'] ) ) {
		$new_settings['key_id'] = sanitize_text_field( $settings['key_id'] );
	}

	if ( isset( $settings['team_id'] ) ) {
		$new_settings['team_id'] = sanitize_text_field( $settings['team_id'] );
	}

	return $new_settings;
}
