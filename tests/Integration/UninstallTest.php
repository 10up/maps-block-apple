<?php
/**
 * Tests the plugin's uninstall routine.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration;

use tenup\Maps_Block_Apple\Tests\Integration\Traits\Credentials;
use WP_UnitTestCase;

/**
 * Tests `uninstall.php`.
 */
class UninstallTest extends WP_UnitTestCase {

	use Credentials;

	/**
	 * The uninstall routine removes the saved credentials.
	 */
	public function test_uninstall_removes_the_saved_credentials(): void {
		update_option( 'maps_block_apple', self::valid_credentials() );
		$this->assertNotEmpty( get_option( 'maps_block_apple' ) );

		if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
			define( 'WP_UNINSTALL_PLUGIN', 'maps-block-apple/maps-block-apple.php' );
		}

		require TESTS_REPO_ROOT_DIR . '/uninstall.php';

		// Passing a default skips the registered setting's default, so false means no row.
		$this->assertFalse( get_option( 'maps_block_apple', false ) );
	}
}
