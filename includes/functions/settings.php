<?php
namespace AppleMapsForWordpress\Settings;

/**
 * Setup settings
 *
 * @since 1.0
 */
function setup() {
	add_action(
		'plugins_loaded', function() {
			add_action( 'admin_menu', __NAMESPACE__ . '\admin_menu', 20 );
			add_action( 'admin_init', __NAMESPACE__ . '\setup_fields_sections' );
			add_action( 'admin_init', __NAMESPACE__ . '\register_settings' );
		}
	);
}

/**
 * Output setting menu option
 *
 * @since  1.0
 */
function admin_menu() {
	add_options_page(
		'Apple Maps for WordPress',
		'Apple Maps',
		'manage_options',
		'apple-maps-wordpress',
		__NAMESPACE__ . '\settings_screen'
	);
}

/**
 * Output setting screen
 *
 * @since  1.0
 */
function settings_screen() {
	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'Apple Maps for WordPress Settings', 'apple-maps-for-wordpress' ); ?></h2>

		<form action="options.php" method="post">

			<?php settings_fields( 'amfwp_settings' ); ?>
			<?php do_settings_sections( 'applemapswordpress' ); ?>

			<?php submit_button(); ?>

		</form>
	</div>
	<?php
}

/**
 * Register setting fields and sections
 *
 * @since  1.0
 */
function setup_fields_sections() {
	add_settings_section( 'amfwp-section-1', '', '', 'applemapswordpress' );
	add_settings_field(
		'long_life_auth_token',
		esc_html__( 'Long Life Authentication Token', 'apple-maps-for-wordpress' ),
		__NAMESPACE__ . '\long_life_auth_token',
		'applemapswordpress',
		'amfwp-section-1'
	);
}

/**
 * Render the long life token settings box
 */
function long_life_auth_token() {
	$settings = get_option( 'amfwp_settings' );
	$ll_token = isset( $settings['long_life_token'] ) ? $settings['long_life_token'] : '';
	?>
	<textarea name="amfwp_settings[long_life_token]" cols="40" rows="10"><?php echo esc_textarea( $ll_token ); ?></textarea>
	<p class="description">
		<?php esc_html_e( 'TEXT TBD', 'apple-maps-for-wordpress' ); ?>
	</p>
	<?php
}


/**
 * Register settings for options table
 *
 * @since  1.0
 */
function register_settings() {
	register_setting( 'amfwp_settings', 'amfwp_settings', __NAMESPACE__ . '\sanitize_settings' );
}

/**
 * Sanitize settings for DB
 *
 * @param array $settings The array of setting to santize.
 * @return array
 * @since  1.0
 */
function sanitize_settings( $settings ) {
	$new_settings = [];
	if ( isset( $settings['long_life_token'] ) ) {
		$new_settings['long_life_token'] = sanitize_text_field( $settings['long_life_token'] );
	}
	return $new_settings;
}

