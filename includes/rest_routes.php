<?php
/**
 * Register Block Assets
 *
 * @package tenup\Apple_Maps_WordPress
 */

namespace tenup\Apple_Maps_WordPress;

use \WP_Error as WP_Error;

/*
 * Setup REST Endpoint to get a valid JWT
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'AppleMapsWordPress/v1',
			'/GetJWT',
			[
				'methods'  => 'GET',
				'callback' => __NAMESPACE__ . '\get_jwt',
			]
		);
	}
);

/**
 * Encode String
 *
 * @param [String] $string String to be encoded
 * @return [String]
 */
function encode( $string ) {
	$response = strtr( base64_encode( $string ), '+/', '-_' );
	return rtrim( $response, '=' );
}

/**
 * MapKit get JWT
 *
 * @return [WP_REST_Response]
 */
function get_jwt() {

	$private_key = get_option( 'apple_maps_wordpress_private_key' );
	$key_id      = get_option( 'apple_maps_wordpress_key_id' );
	$team_id     = get_option( 'apple_maps_wordpress_team_id' );

	if ( ! isset( $private_key ) ) {
		return new WP_Error( 'NoKey', 'Missing Private Key' );
	}
	if ( ! isset( $key_id ) ) {
		return new WP_Error( 'NoKey', 'Missing Key ID' );
	}
	if ( ! isset( $team_id ) ) {
		return new WP_Error( 'NoKey', 'Missing Team ID' );
	}

	$header = [
		'alg' => 'ES256',
		'typ' => 'JWT',
		'kid' => $key_id,
	];

	$body = [
		'iss' => $team_id,
		'iat' => time(),
		'exp' => time() + 30,
	];

	$payload = encode( wp_json_encode( $header ) ) . '.' . encode( wp_json_encode( $body ) );

	$key = openssl_pkey_get_private( $private_key );
	if ( ! $key ) {
		return new WP_Error( 'InvalidKey', 'Invalid Private Key' );
	}

	if ( ! openssl_sign( $payload, $signature, $key, OPENSSL_ALGO_SHA256 ) ) {
		return new WP_Error( 'SignError', 'Signing Failed' );
	}

	$response = $payload . '.' . encode( $signature );
	return new \WP_REST_Response( $response, 200 );
}

