<?php
/**
 * Register Block Assets
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple;

use \WP_Error as WP_Error;
use \WP_REST_Response as WP_REST_Response;
use \WP_REST_Server as WP_REST_Server;
use function tenup\Maps_Block_Apple\Settings\get_setting;

define( 'MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE', 'MapsBlockApple/v1' );


add_action( 'rest_api_init', __NAMESPACE__ . '\add_endpoints' );
/**
 * Add custom rest endpoints
 */
function add_endpoints() {

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/GetJWT',
		[
			'methods'  => 'GET',
			'callback' => __NAMESPACE__ . '\get_jwt',
		]
	);
}



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
	$private_key = get_setting( 'private_key' );
	$key_id      = get_setting( 'key_id' ); 
	$team_id     = get_setting( 'team_id'); 

	if ( ! isset( $private_key ) || '' === $private_key ) {
		return new WP_Error( 'NoKey', 'Missing Private Key', [ 'status' => 401 ] );
	}
	if ( ! isset( $key_id ) || '' === $key_id ) {
		return new WP_Error( 'NoKey', 'Missing Key ID', [ 'status' => 401 ] );
	}
	if ( ! isset( $team_id ) || '' === $team_id ) {
		return new WP_Error( 'NoKey', 'Missing Team ID', [ 'status' => 401 ] );
	}

	$header = [
		'alg' => 'ES256',
		'typ' => 'JWT',
		'kid' => $key_id,
	];

	$body = [
		'iss'    => $team_id,
		'iat'    => time(),
		'exp'    => time() + 30,
		'origin' => get_site_url(),
	];

	$payload = encode( wp_json_encode( $header ) ) . '.' . encode( wp_json_encode( $body ) );

	$key = openssl_pkey_get_private( $private_key );
	if ( ! $key ) {
		return new WP_Error( 'InvalidKey', 'Invalid Private Key', [ 'status' => 401 ] );
	}

	if ( ! openssl_sign( $payload, $signature, $key, OPENSSL_ALGO_SHA256 ) ) {
		return new WP_Error( 'SignError', 'Signing Failed', [ 'status' => 500 ] );
	}

	$response = $payload . '.' . encode( $signature );
	return new WP_REST_Response( $response, 200 );
}