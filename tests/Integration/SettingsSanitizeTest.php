<?php
/**
 * Tests what is stored when MapKit credentials are saved.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration;

use tenup\Maps_Block_Apple\Tests\Integration\Traits\Credentials;
use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Tests the `maps_block_apple` setting's sanitizing through the core settings
 * route, the path the block editor's credentials form saves through.
 *
 * Credentials are usually pasted from Apple's developer portal, often with
 * surrounding whitespace. The token route checks the IDs' exact length, so
 * the stored values must be trimmed for pasted credentials to work.
 */
class SettingsSanitizeTest extends WP_UnitTestCase {

	use Credentials;

	/**
	 * Administrator user ID.
	 *
	 * @var int
	 */
	protected static $admin_id;

	/**
	 * Creates the administrator who saves the settings.
	 *
	 * @param \WP_UnitTest_Factory $factory Test factory.
	 */
	public static function wpSetUpBeforeClass( $factory ): void {
		self::$admin_id = $factory->user->create( array( 'role' => 'administrator' ) );
	}

	/**
	 * Starts each test with a fresh REST server, so `rest_api_init` runs (and
	 * registers the setting with its sanitize callback) as in a real request.
	 * Hooks added in earlier tests are removed after each test.
	 */
	public function set_up(): void {
		parent::set_up();
		$GLOBALS['wp_rest_server'] = null;
	}

	/**
	 * Drops the REST server this test created.
	 */
	public function tear_down(): void {
		$GLOBALS['wp_rest_server'] = null;
		parent::tear_down();
	}

	/**
	 * Credentials saved with surrounding whitespace are stored trimmed, and the
	 * token route then issues a token for the trimmed key ID.
	 */
	public function test_credentials_saved_with_surrounding_whitespace_are_trimmed(): void {
		$private_key = trim( self::generate_private_key() );

		wp_set_current_user( self::$admin_id );

		$request = new WP_REST_Request( 'POST', '/wp/v2/settings' );
		$request->set_body_params(
			array(
				'maps_block_apple' => array(
					'private_key' => "\n  " . $private_key . "  \n",
					'key_id'      => '  ' . self::$key_id . " \n",
					'team_id'     => "\t" . self::$team_id . ' ',
				),
			)
		);
		$response = rest_do_request( $request );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame(
			array(
				'private_key' => $private_key,
				'key_id'      => self::$key_id,
				'team_id'     => self::$team_id,
			),
			get_option( 'maps_block_apple' )
		);

		wp_set_current_user( 0 );
		$token = rest_do_request( new WP_REST_Request( 'GET', '/MapsBlockApple/v1/GetJWT' ) );

		$this->assertSame( 200, $token->get_status() );
		$this->assertSame( self::$key_id, self::decode_segment( explode( '.', $token->get_data() )[0] )['kid'] );
	}
}
