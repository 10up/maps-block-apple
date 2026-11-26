<?php
/**
 * Tests which MapKit assets load on the front end.
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Tests\Integration;

use WP_UnitTestCase;

/**
 * Tests that Apple's MapKit JS script stays off front-end pages that show no
 * map. The script is loaded from Apple's CDN, so loading it on every page
 * would send every visitor's browser to Apple.
 */
class FrontendAssetsTest extends WP_UnitTestCase {

	/**
	 * Script handles queued before the test.
	 *
	 * @var string[]
	 */
	private $queue_before = array();

	/**
	 * Records the script queue so the test can restore it.
	 */
	public function set_up(): void {
		parent::set_up();
		$this->queue_before = wp_scripts()->queue;
	}

	/**
	 * Restores the script queue.
	 */
	public function tear_down(): void {
		wp_scripts()->queue = $this->queue_before;
		parent::tear_down();
	}

	/**
	 * A front-end page without the block does not enqueue MapKit JS.
	 */
	public function test_mapkit_script_is_not_enqueued_on_front_end_page_without_the_block(): void {
		$post_id = self::factory()->post->create(
			array(
				'post_content' => '<!-- wp:paragraph --><p>No map here.</p><!-- /wp:paragraph -->',
			)
		);

		$this->assertTrue( wp_script_is( 'apple-mapkit-js', 'registered' ) );
		wp_dequeue_script( 'apple-mapkit-js' );

		$this->go_to( get_permalink( $post_id ) );
		$this->assertFalse( is_admin() );

		do_action( 'wp_enqueue_scripts' );

		$this->assertFalse( wp_script_is( 'apple-mapkit-js', 'enqueued' ) );
	}
}
