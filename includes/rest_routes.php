<?php
/**
 * Register Block Assets
 *
 * @package tenup\Apple_Maps_WordPress
 */

namespace tenup\Apple_Maps_WordPress;

use \WP_Error as WP_Error;
use \WP_REST_Response as WP_REST_Response;
use \WP_REST_Server as WP_REST_Server;

define( 'APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE', 'AppleMapsWordPress/v1' );


add_action( 'rest_api_init', __NAMESPACE__ . '\add_endpoints' );
/**
 * Add custom rest endpoints
 */
function add_endpoints() {

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/GetJWT',
		[
			'methods'  => 'GET',
			'callback' => __NAMESPACE__ . '\get_jwt',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/private_key',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_apple_maps_private_key',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/private_key/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_apple_maps_private_key',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/team_id',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_apple_maps_team_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/team_id/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_apple_maps_team_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/key_id',
		[
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => __NAMESPACE__ . '\update_apple_maps_key_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
		]
	);

	register_rest_route(
		APPLE_MAPS_WORDPRESS_VERSION_REST_NAMESPACE,
		'/key_id/get',
		[
			'methods'             => 'GET',
			'callback'            => __NAMESPACE__ . '\get_apple_maps_key_id',
			'permission_callback' => __NAMESPACE__ . '\check_permissions',
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
	return new WP_REST_Response( $response, 200 );
}

/**
 * Get private_key Setting
 *
 * @param [WP_REST_Request] $request request
 */
function get_apple_maps_private_key( $request ) {
	$private_key = get_option( 'apple_maps_private_key' );
	$response    = new WP_REST_Response( $private_key );
	$response->set_status( 201 );

	return $response;
}

/**
 * Get team_id Setting
 *
 * @param [WP_REST_Request] $request request
 */
function get_apple_maps_team_id( $request ) {
	$team_id  = get_option( 'apple_maps_team_id' );
	$response = new WP_REST_Response( $team_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Get key_id Setting
 *
 * @param [WP_REST_Request] $request request
 */
function get_apple_maps_key_id( $request ) {
	$key_id   = get_option( 'apple_maps_key_id' );
	$response = new WP_REST_Response( $key_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update private_key Setting
 *
 * @param [WP_REST_Request] $request request
 */
function update_apple_maps_private_key( $request ) {

	$new_private_key = $request->get_body();
	update_option( 'apple_maps_private_key', $new_private_key );

	$private_key = get_option( 'apple_maps_private_key' );
	$response    = new WP_REST_Response( $private_key );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update team_id Setting
 *
 * @param [WP_REST_Request] $request request
 */
function update_apple_maps_team_id( $request ) {

	$new_team_id = $request->get_body();
	update_option( 'apple_maps_team_id', $new_team_id );

	$team_id  = get_option( 'apple_maps_team_id' );
	$response = new WP_REST_Response( $team_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Update key_id Setting
 *
 * @param [WP_REST_Request] $request request
 */
function update_apple_maps_key_id( $request ) {

	$new_key_id = $request->get_body();
	update_option( 'apple_maps_key_id', $new_key_id );

	$key_id   = get_option( 'apple_maps_key_id' );
	$response = new WP_REST_Response( $key_id );
	$response->set_status( 201 );

	return $response;
}

/**
 * Check wether user can Edit Posts
 */
function check_permissions() {
	return current_user_can( 'edit_posts' );
}
