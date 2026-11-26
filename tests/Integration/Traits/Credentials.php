<?php
/**
 * Shared helpers for tests that need MapKit credentials or tokens.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration\Traits;

/**
 * Builds credentials in the shape the plugin stores them and decodes the
 * tokens it issues. The keys are generated per test run; they are not Apple
 * credentials.
 */
trait Credentials {

	/**
	 * Key ID used in valid credentials. MapKit key IDs are 10 characters.
	 *
	 * @var string
	 */
	protected static $key_id = 'KEYID12345';

	/**
	 * Team ID used in valid credentials. Apple team IDs are 10 characters.
	 *
	 * @var string
	 */
	protected static $team_id = 'TEAMID1234';

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
	protected static function generate_private_key(): string {
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
	 * Returns a complete, well-formed credential set.
	 *
	 * @return array Credentials keyed as in the `maps_block_apple` option.
	 */
	protected static function valid_credentials(): array {
		return array(
			'private_key' => self::generate_private_key(),
			'key_id'      => self::$key_id,
			'team_id'     => self::$team_id,
		);
	}

	/**
	 * Decodes one base64url-encoded JWT segment.
	 *
	 * @param string $segment Encoded segment.
	 * @return array Decoded JSON object.
	 */
	protected static function decode_segment( string $segment ): array {
		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode -- Decoding a JWT segment.
		return json_decode( base64_decode( strtr( $segment, '-_', '+/' ) ), true );
	}
}
