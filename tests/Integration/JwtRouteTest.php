<?php
/**
 * Tests the token the public MapKit JWT route hands out.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration;

use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Tests `GET /MapsBlockApple/v1/GetJWT`.
 *
 * Every visitor's browser asks this route for a token, so it is public. It
 * must return only a short-lived signed token, never the stored credentials.
 */
class JwtRouteTest extends WP_UnitTestCase {

	/**
	 * Key ID saved with the credentials. MapKit key IDs are 10 characters.
	 *
	 * @var string
	 */
	const KEY_ID = 'KEYID12345';

	/**
	 * Team ID saved with the credentials. Apple team IDs are 10 characters.
	 *
	 * @var string
	 */
	const TEAM_ID = 'TEAMID1234';

	/**
	 * Decodes one base64url-encoded JWT segment.
	 *
	 * @param string $segment Encoded segment.
	 * @return array Decoded JSON object.
	 */
	private static function decode_segment( string $segment ): array {
		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode -- Decoding a JWT segment.
		return json_decode( base64_decode( strtr( $segment, '-_', '+/' ) ), true );
	}

	/**
	 * Encodes a DER length.
	 *
	 * @param int $length Content length in bytes (below 256).
	 * @return string DER length octets.
	 */
	private static function der_length( int $length ): string {
		return $length < 128 ? chr( $length ) : "\x81" . chr( $length );
	}

	/**
	 * Generates a P-256 private key as a PKCS #8 PEM, the format of the .p8
	 * keys Apple issues for MapKit JS.
	 *
	 * PHP 8 exports EC keys as PKCS #8. PHP 7.4 exports them as SEC1
	 * ("BEGIN EC PRIVATE KEY"), so that form is wrapped in a PKCS #8
	 * PrivateKeyInfo structure here.
	 *
	 * @return string PEM-encoded private key.
	 */
	private static function generate_private_key(): string {
		$key = openssl_pkey_new(
			array(
				'private_key_type' => OPENSSL_KEYTYPE_EC,
				'curve_name'       => 'prime256v1',
			)
		);
		openssl_pkey_export( $key, $pem );

		if ( 0 === strpos( $pem, '-----BEGIN PRIVATE KEY-----' ) ) {
			return $pem;
		}

		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode -- Reading a PEM body.
		$sec1 = base64_decode( preg_replace( '/-----[^-]+-----|\s/', '', $pem ) );

		// AlgorithmIdentifier: id-ecPublicKey with the prime256v1 curve.
		$algorithm = "\x30\x13\x06\x07\x2a\x86\x48\xce\x3d\x02\x01\x06\x08\x2a\x86\x48\xce\x3d\x03\x01\x07";
		$octets    = "\x04" . self::der_length( strlen( $sec1 ) ) . $sec1;
		$body      = "\x02\x01\x00" . $algorithm . $octets;
		$pkcs8     = "\x30" . self::der_length( strlen( $body ) ) . $body;

		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- Writing a PEM body.
		return "-----BEGIN PRIVATE KEY-----\n" . chunk_split( base64_encode( $pkcs8 ), 64, "\n" ) . "-----END PRIVATE KEY-----\n";
	}

	/**
	 * A logged-out request gets an ES256 token for the saved key and team that
	 * expires 30 seconds after issue, and the response carries no key material.
	 */
	public function test_logged_out_request_gets_short_lived_token_without_key_material(): void {
		$private_key = self::generate_private_key();
		$this->assertNotFalse( openssl_pkey_get_private( $private_key ) );

		update_option(
			'maps_block_apple',
			array(
				'private_key' => $private_key,
				'key_id'      => self::KEY_ID,
				'team_id'     => self::TEAM_ID,
			)
		);
		wp_set_current_user( 0 );

		$response = rest_do_request( new WP_REST_Request( 'GET', '/MapsBlockApple/v1/GetJWT' ) );

		$this->assertSame( 200, $response->get_status() );

		$token = $response->get_data();
		$this->assertIsString( $token );

		$segments = explode( '.', $token );
		$this->assertCount( 3, $segments );

		$header = self::decode_segment( $segments[0] );
		$this->assertSame( 'ES256', $header['alg'] );
		$this->assertSame( self::KEY_ID, $header['kid'] );

		$claims = self::decode_segment( $segments[1] );
		$this->assertSame( self::TEAM_ID, $claims['iss'] );
		$this->assertSame( 30, $claims['exp'] - $claims['iat'] );

		$this->assertStringNotContainsString( 'PRIVATE KEY', wp_json_encode( $response->get_data() ) );
	}
}
