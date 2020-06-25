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

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/private_key',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_maps_block_apple_private_key',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/private_key/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_maps_block_apple_private_key',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/team_id',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_maps_block_apple_team_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/team_id/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_maps_block_apple_team_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/key_id',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_maps_block_apple_key_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		MAPS_BLOCK_APPLE_VERSION_REST_NAMESPACE,
		'/key_id/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_maps_block_apple_key_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);
}



/**
 * Encode String.
 *
 * @param [string] $string String to be encoded.
 * @return [string]
 */
function encode( $string ) {
	$response = strtr( base64_encode( $string ), '+/', '-_' );
	return rtrim( $response, '=' );
}

/**
 * MapKit get JWT.
 *
 * @return [WP_REST_Response]
 */
function get_jwt() {

	$private_key = get_option( 'maps_block_apple_private_key' );
	$key_id      = get_option( 'maps_block_apple_key_id' );
	$team_id     = get_option( 'maps_block_apple_team_id' );

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

/**
 * Get private_key Setting.
 *
 * @param [WP_REST_Request] $request Request object.
 */
function get_maps_block_apple_private_key( $request ) {
	$private_key = get_option( 'maps_block_apple_private_key' );
	$response    = new WP_REST_Response( $private_key );
	$response->set_status( 201 );

	return $response;
}

/**
 * Get team_id Setting
 *
 * @param [WP_REST_Request] $request Request object.
 */
function get_maps_block_apple_team_id( $request ) {
	$team_id  = get_option( 'maps_block_apple_team_id' );
	$response = new WP_REST_Response( $team_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Get key_id Setting
 *
 * @param [WP_REST_Request] $request Request object.
 */
function get_maps_block_apple_key_id( $request ) {
	$key_id   = get_option( 'maps_block_apple_key_id' );
	$response = new WP_REST_Response( $key_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update private_key Setting
 *
 * @param [WP_REST_Request] $request Request object.
 */
function update_maps_block_apple_private_key( $request ) {

	$new_private_key = json_decode( $request->get_body() );
	$sanitized       = sanitize_option( 'maps_block_apple_private_key', $new_private_key );
	update_option( 'maps_block_apple_private_key', $sanitized );

	$private_key = get_option( 'maps_block_apple_private_key' );
	$response    = new WP_REST_Response( $private_key );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update team_id Setting
 *
 * @param [WP_REST_Request] $request Request object.
 */
function update_maps_block_apple_team_id( $request ) {

	$new_team_id = json_decode( $request->get_body() );
	$sanitized   = sanitize_option( 'maps_block_apple_team_id', $new_team_id );
	update_option( 'maps_block_apple_team_id', $sanitized );

	$team_id  = get_option( 'maps_block_apple_team_id' );
	$response = new WP_REST_Response( $team_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update key_id Setting
 *
 * @param [WP_REST_Request] $request Request object.
 */
function update_maps_block_apple_key_id( $request ) {

	$new_key_id = json_decode( $request->get_body() );
	$sanitized  = sanitize_option( 'maps_block_apple_key_id', $new_key_id );
	update_option( 'maps_block_apple_key_id', $sanitized );

	$key_id   = get_option( 'maps_block_apple_key_id' );
	$response = new WP_REST_Response( $key_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Check whether user has the appropriate permissions.
 */
function check_permissions() {
	return current_user_can( 'manage_options' );
}
