<?php

namespace AppleMapsForWordpress\Settings;

use AppleMapsForWordpress\Core;

/**
 * Setup settings
 *
 * @since 1.0
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};
	add_action( 'admin_menu', $n( 'admin_menu' ), 20 );
	add_action( 'admin_init', $n( 'setup_fields_sections' ) );
	add_action( 'admin_init', $n ( 'register_settings' ) );
	add_filter( 'plugin_action_links_' . APPLE_MAPS_FOR_WORDPRESS_BASENAME, $n( 'plugin_filter_action_links' ) );
}


/**
 * Add the settings panel to the plugin page
 *
 * @param array $links the links for the plugin.
 *
 * @return array
 */
function plugin_filter_action_links( $links ) {
	$links['settings'] = sprintf( '<a href="%s"> %s </a>', esc_url( admin_url( 'options-general.php?page=apple-maps-wordpress' ) ), __( 'Settings', 'apple-maps-for-wordpress' ) );
	return $links;
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


function generate_button() {
	?>
	<button aria-label="Generate Long Life Token" class="button" id="generate-token"><?php esc_html_e( 'Generate New Token', 'apple-maps-for-wordpress' ); ?></button>
	<?php
}
/**
 * Register setting fields and sections
 *
 * @since  1.0
 */
function setup_fields_sections() {
	add_settings_section( 'amfwp-section-2', 'Authorization Token Credentials', '', 'applemapswordpress' );
	add_settings_section( 'amfwp-section-1', 'Active Authorization Token', __NAMESPACE__ . '\generate_button', 'applemapswordpress' );
	add_settings_field(
		'long_life_auth_token',
		esc_html__( 'Long Life Authorization Token', 'apple-maps-for-wordpress' ),
		__NAMESPACE__ . '\long_life_auth_token',
		'applemapswordpress',
		'amfwp-section-1'
	);

	add_settings_field(
		'token_gen_iss',
		esc_html__( 'Apple Developer Team ID', 'apple-maps-for-wordpress' ),
		__NAMESPACE__ . '\token_gen_iss',
		'applemapswordpress',
		'amfwp-section-2'
	);

	add_settings_field(
		'token_gen_kid',
		esc_html__( 'MapKit JS Key Name', 'apple-maps-for-wordpress' ),
		__NAMESPACE__ . '\token_gen_kid',
		'applemapswordpress',
		'amfwp-section-2'
	);

	add_settings_field(
		'token_gen_authkey',
		esc_html__( 'MapKit JS Key', 'apple-maps-for-wordpress' ),
		__NAMESPACE__ . '\token_gen_authkey',
		'applemapswordpress',
		'amfwp-section-2'
	);
}

/**
 * Render the long life token settings box
 */
function long_life_auth_token() {
	$settings          = get_option( 'amfwp_settings' );
	$ll_token          = isset( $settings['long_life_token'] ) ? $settings['long_life_token'] : '';
	$container_classes = ( ! empty( $ll_token ) ) ? 'hidden' : '';
	$button_classes    = ( empty( $ll_token ) ) ? 'button hidden' : 'button';
	?>
	<button id="toggle-long-life-token" data-text-index="LongLifeToken" class="<?php echo esc_attr( $button_classes ); ?>">
		<?php esc_html_e( 'Show Long Life Token', 'apple-maps-for-wordpress' ); ?>
	</button>
	<div id="long-life-token-container" class="<?php echo esc_attr( $container_classes ); ?>">
		<br/>
		<textarea readonly name="amfwp_settings[long_life_token]" cols="40" rows="10" id="long-life-token"><?php echo esc_textarea( $ll_token ); ?></textarea>
		<p class="description">
			<?php echo wp_kses_post( _e( 'This Long Life Authorization Token is used by the Apple Maps for WordPress plugin to authenticate with MapKit JS. <br>For more information please see <a href="https://developer.apple.com/videos/play/wwdc2018/508" target="_blank" rel="noopener noreferrer">Getting and Using a MapKit JS Key on the Apple Developer site.</a>', 'apple-maps-for-wordpress' ) ); ?>
		</p>
	</div>
	<?php
}

/**
 *
 */
function token_gen_authkey() {
	$settings          = get_option( 'amfwp_settings' );
	$authkey           = isset( $settings['token_gen_authkey'] ) ? $settings['token_gen_authkey'] : '';
	$container_classes = ( ! empty( $authkey ) ) ? 'hidden' : '';
	$button_classes    = ( empty( $authkey ) ) ? 'button hidden' : 'button';
	?>
	
	<button id="toggle-auth-key" data-text-index="AuthKey" class="<?php echo esc_attr( $button_classes ); ?>">
		<?php esc_html_e( 'Show MapKit JS Key', 'apple-maps-for-wordpress' ); ?>
	</button>
	<div id="authkey-container" class="<?php echo esc_attr( $container_classes ); ?>">
		<br/>
		<textarea name="amfwp_settings[token_gen_authkey]" cols="40" rows="10" id="token-gen-authkey"><?php echo esc_textarea( $authkey ); ?></textarea>
		<p class="description">
			<?php echo wp_kses_post( _e( 'Copy and paste the contents of the MapKit JS Key that was generated and downloaded from the Apple Developer website.<br>For instructions on generating a MapKit KS key, see <a href="https://developer.apple.com/videos/play/wwdc2018/508" target="_blank" rel="noopener noreferrer">Getting and Using a MapKit JS Key on the Apple Developer site.</a>', 'apple-maps-for-wordpress' ) ); ?>
		</p>
	</div>
	<?php
}

/**
 *
 */
function token_gen_iss() {
	$settings = get_option( 'amfwp_settings' );
	$iss      = isset( $settings['token_gen_iss'] ) ? $settings['token_gen_iss'] : '';
	?>
	<input type="text" name="amfwp_settings[token_gen_iss]" id="token-gen-iss" value="<?php echo esc_attr( $iss ); ?>"/>
	<p class="description">
		<?php echo wp_kses_post( _e( 'Your Team ID can be found in your Apple Developer account <a href="https://developer.apple.com/account/#/membership/" target="_blank" rel="noopener noreferrer">here</a>. Requires login.', 'apple-maps-for-wordpress' ) ); ?>
	</p>
	<?php
}

/**
 *
 */
function token_gen_kid() {
	$settings = get_option( 'amfwp_settings' );
	$kid      = isset( $settings['token_gen_kid'] ) ? $settings['token_gen_kid'] : '';
	?>
	<input type="text" name="amfwp_settings[token_gen_kid]" id="token-gen-kid" value="<?php echo esc_attr( $kid ); ?>"/>
	<p class="description">
		<?php echo wp_kses_post( _e( 'This is the name of the MapKit JS key file that was downloaded from the Apple Developer website. Please omit the .p8 extension.', 'apple-maps-for-wordpress' ) ); ?>
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
 * @param array $settings The array of setting to sanitize.
 *
 * @return array
 * @since  1.0
 */
function sanitize_settings( $settings ) {
	$new_settings = [];
	if ( isset( $settings['long_life_token'] ) ) {
		$new_settings['long_life_token'] = sanitize_textarea_field( $settings['long_life_token'] );
	}

	if ( isset( $settings['token_gen_authkey'] ) ) {
		$new_settings['token_gen_authkey'] = $settings['token_gen_authkey'];
	}

	if ( isset( $settings['token_gen_iss'] ) ) {
		$new_settings['token_gen_iss'] = sanitize_text_field( $settings['token_gen_iss'] );
	}

	if ( isset( $settings['token_gen_kid'] ) ) {
		$new_settings['token_gen_kid'] = sanitize_text_field( $settings['token_gen_kid'] );
	}

	return $new_settings;
}
