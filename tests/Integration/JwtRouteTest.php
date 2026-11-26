<?php
/**
 * Tests the token the public MapKit JWT route hands out.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration;

use tenup\Maps_Block_Apple\Tests\Integration\Traits\Credentials;
use WP_REST_Request;
use WP_REST_Response;
use WP_UnitTestCase;

/**
 * Tests `GET /MapsBlockApple/v1/GetJWT`.
 *
 * Every visitor's browser asks this route for a token, so it is public. It
 * must return only a short-lived signed token, never the stored credentials,
 * and only when the stored credentials are complete and well formed.
 */
class JwtRouteTest extends WP_UnitTestCase {

	use Credentials;

	/**
	 * Requests a token as a logged-out visitor.
	 *
	 * @return WP_REST_Response Route response.
	 */
	private function request_token(): WP_REST_Response {
		wp_set_current_user( 0 );

		return rest_do_request( new WP_REST_Request( 'GET', '/MapsBlockApple/v1/GetJWT' ) );
	}

	/**
	 * A logged-out request gets an ES256 token for the saved key and team that
	 * expires 30 seconds after issue, and the response carries no key material.
	 */
	public function test_logged_out_request_gets_short_lived_token_without_key_material(): void {
		$credentials = self::valid_credentials();
		$this->assertNotFalse( openssl_pkey_get_private( $credentials['private_key'] ) );

		update_option( 'maps_block_apple', $credentials );

		$response = $this->request_token();

		$this->assertSame( 200, $response->get_status() );

		$token = $response->get_data();
		$this->assertIsString( $token );

		$segments = explode( '.', $token );
		$this->assertCount( 3, $segments );

		$header = self::decode_segment( $segments[0] );
		$this->assertSame( 'ES256', $header['alg'] );
		$this->assertSame( self::$key_id, $header['kid'] );

		$claims = self::decode_segment( $segments[1] );
		$this->assertSame( self::$team_id, $claims['iss'] );
		$this->assertSame( 30, $claims['exp'] - $claims['iat'] );

		$this->assertStringNotContainsString( 'PRIVATE KEY', wp_json_encode( $response->get_data() ) );
	}

	/**
	 * Incomplete or malformed credentials, and the refusal each one gets.
	 *
	 * Each case changes valid credentials; `null` means nothing is saved. When
	 * several values are wrong, the first failing check in the route's order
	 * (private key present, key ID present, team ID present, key ID length,
	 * team ID length, private key format) decides the message.
	 *
	 * @return array[] Credential changes, error code and message per case.
	 */
	public function data_refused_credentials(): array {
		$pem_without_key = "-----BEGIN PRIVATE KEY-----\nbm90IGEga2V5\n-----END PRIVATE KEY-----\n";

		return array(
			'nothing saved'                     => array( null, 'NoKey', 'Missing Private Key' ),
			'empty private key'                 => array( array( 'private_key' => '' ), 'NoKey', 'Missing Private Key' ),
			'empty key ID'                      => array( array( 'key_id' => '' ), 'NoKey', 'Missing Key ID' ),
			'empty key ID and team ID'          => array(
				array(
					'key_id'  => '',
					'team_id' => '',
				),
				'NoKey',
				'Missing Key ID',
			),
			'empty team ID'                     => array( array( 'team_id' => '' ), 'NoKey', 'Missing Team ID' ),
			'9-character key ID'                => array( array( 'key_id' => 'KEYID1234' ), 'InvalidKey', 'Invalid Key ID' ),
			'11-character key ID'               => array( array( 'key_id' => 'KEYID123456' ), 'InvalidKey', 'Invalid Key ID' ),
			'short key ID and short team ID'    => array(
				array(
					'key_id'  => 'KEY',
					'team_id' => 'TEAM',
				),
				'InvalidKey',
				'Invalid Key ID',
			),
			'9-character team ID'               => array( array( 'team_id' => 'TEAMID123' ), 'InvalidKey', 'Invalid Team ID' ),
			'11-character team ID'              => array( array( 'team_id' => 'TEAMID12345' ), 'InvalidKey', 'Invalid Team ID' ),
			'private key without PEM markers'   => array( array( 'private_key' => 'INVALID' ), 'InvalidKey', 'Invalid Private Key' ),
			'PEM markers around a non-key body' => array( array( 'private_key' => $pem_without_key ), 'InvalidKey', 'Invalid Private Key' ),
		);
	}

	/**
	 * Incomplete or malformed credentials get a 401 with the matching error
	 * and no token.
	 *
	 * @dataProvider data_refused_credentials
	 *
	 * @param array|null $changes Changes to valid credentials; null saves nothing.
	 * @param string     $code    Expected error code.
	 * @param string     $message Expected error message.
	 */
	public function test_incomplete_or_malformed_credentials_get_no_token( ?array $changes, string $code, string $message ): void {
		if ( null !== $changes ) {
			update_option( 'maps_block_apple', array_merge( self::valid_credentials(), $changes ) );
		}

		$response = $this->request_token();

		$this->assertSame( 401, $response->get_status() );
		$this->assertTrue( $response->is_error() );

		$error = $response->as_error();
		$this->assertSame( $code, $error->get_error_code() );
		$this->assertSame( $message, $error->get_error_message() );
		// The body is the error alone: no token alongside it.
		$this->assertSame( array( 'code', 'message', 'data' ), array_keys( $response->get_data() ) );
	}
}
