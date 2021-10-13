<?php
/**
 * Setting page
 *
 * @package tenup\Maps_Block_Apple
 */

namespace tenup\Maps_Block_Apple\Settings;

/**
 * Setup settings
 *
 * @since 1.0.0
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};
	add_action( 'admin_menu', $n( 'admin_menu' ), 20 );
	add_action( 'admin_init', $n( 'setup_fields_sections' ) );
	add_action( 'admin_init', $n( 'register_settings' ) );
	add_action( 'rest_api_init', $n( 'register_settings' ) );
	add_filter( 'plugin_action_links_' . MAPS_BLOCK_APPLE_BASENAME, $n( 'plugin_filter_action_links' ) );
	add_action( 'admin_enqueue_scripts', $n( 'enqueue_settings_assets' ) );
}

/**
 * Helper to retrieve a setting.
 *
 * @param string $setting The name of the setting.
 * @return mixed
 */
function get_setting( $setting ) {
	$settings = get_option( 'maps_block_apple', [] );
	return isset( $settings[ $setting ] ) ? $settings[ $setting ] : '';
}

/**
 * Register settings for options table
 *
 * @since  1.0
 */
function register_settings() {
	register_setting(
		'maps_block_apple',
		'maps_block_apple',
		array(
			'show_in_rest'      => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'private_key' => array(
							'type' => 'string',
						),
						'team_id'     => array(
							'type' => 'string',
						),
						'key_id'      => array(
							'type' => 'string',
						),
					),
				),
			),
			'default'           => [],
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_settings',
		)
	);
}


/**
 * Add the settings panel to the plugin page
 *
 * @param array $links the links for the plugin.
 *
 * @return array
 */
function plugin_filter_action_links( $links ) {
	$links['settings'] = sprintf( '<a href="%s"> %s </a>', esc_url( admin_url( 'options-general.php?page=block-for-apple-maps' ) ), __( 'Settings', 'maps-block-apple' ) );
	return $links;
}


/**
 * Output setting menu option
 *
 * @since  1.0
 */
function admin_menu() {
	add_options_page(
		'Block for Apple Maps Settings',
		'Block for Apple Maps ',
		'manage_options',
		'block-for-apple-maps',
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
		<h1><?php esc_html_e( 'Block for Apple Maps Settings', 'maps-block-apple' ); ?></h1>

		<div class="maps-block-apple-settings">
			<form action="options.php" method="post">
				<?php settings_fields( 'maps_block_apple' ); ?>
				<?php do_settings_sections( 'mapsblockapple' ); ?>
				<?php submit_button( esc_html__( 'Confirm MapKit Credentials', 'maps-block-apple' ) ); ?>
			</form>
			<div class="brand">
				<a href="https://10up.com" class="logo" title="<?php esc_attr_e( '10up', 'maps-block-apple' ); ?>">
					<img src="<?php echo esc_url( trailingslashit( MAPS_BLOCK_APPLE_URL ) . 'assets/images/10up.svg' ); ?>" alt="<?php esc_attr_e( '10up logo', 'maps-block-apple' ); ?>" />
				</a>
				<p>
					<strong>
						<?php echo esc_html__( 'Block for Apple Maps', 'maps-block-apple' ) . ' ' . esc_html__( 'by', 'maps-block-apple' ); ?> <a href="https://10up.com" class="logo" title="<?php esc_attr_e( '10up', 'maps-block-apple' ); ?>"><?php esc_html_e( '10up', 'maps-block-apple' ); ?></a>
					</strong>
				</p>
				<nav>
					<a href="https://github.com/10up/maps-block-apple#frequently-asked-questions" target="_blank" title="<?php esc_attr_e( 'FAQs', 'maps-block-apple' ); ?>">
						<?php esc_html_e( 'FAQs', 'maps-block-apple' ); ?><span class="dashicons dashicons-external"></span>
					</a>
					<a href="https://github.com/10up/maps-block-apple/issues" target="_blank" title="<?php esc_attr_e( 'Support', 'maps-block-apple' ); ?>">
						<?php esc_html_e( 'Support', 'maps-block-apple' ); ?><span class="dashicons dashicons-external"></span>
					</a>
				</nav>
			</div>
		</div>
	</div>
	<?php
}


/**
 * Enqueues settings screen css.
 *
 * @param string $screen_id The id of the admin screen being viewed.
 * @since 1.0.0
 */
function enqueue_settings_assets( $screen_id ) {
	if ( ! $screen_id || 'settings_page_block-for-apple-maps' !== $screen_id ) {
		return;
	}

	wp_enqueue_style( 'maps-block-apple-settings' );
	wp_enqueue_script( 'maps-block-apple-settings' );
}

/**
 * Register setting fields and sections
 *
 * @since  1.0.0
 */
function setup_fields_sections() {

	add_settings_section(
		'map-blocks-apple-instructions',
		__( 'MapKit JS credential settings', 'maps-block-apple' ),
		__NAMESPACE__ . '\render_instructions',
		'mapsblockapple'
	);

	add_settings_section(
		'maps-block-apple-crendentials',
		'',
		'',
		'mapsblockapple'
	);

	add_settings_field(
		'maps_block_apple_private_key',
		esc_html__( 'Private Key', 'maps-block-apple' ),
		__NAMESPACE__ . '\render_private_key_field',
		'mapsblockapple',
		'maps-block-apple-crendentials'
	);

	add_settings_field(
		'maps_block_apple_key_id',
		esc_html__( 'Key ID', 'maps-block-apple' ),
		__NAMESPACE__ . '\render_key_id_field',
		'mapsblockapple',
		'maps-block-apple-crendentials'
	);

	add_settings_field(
		'maps_block_apple_team_id',
		esc_html__( 'Team ID', 'maps-block-apple' ),
		__NAMESPACE__ . '\render_team_id_field',
		'mapsblockapple',
		'maps-block-apple-crendentials'
	);

	add_settings_field(
		'maps_block_apple_status',
		esc_html__( 'MapKit status', 'maps-block-apple' ),
		__NAMESPACE__ . '\render_credential_status',
		'mapsblockapple',
		'maps-block-apple-crendentials'
	);
}

/**
 * Display instructions for setting fields and sections
 *
 * @since  1.0.0
 */
function render_instructions() {
	?>
	<section class="credentials-instructions">
			<p><?php echo esc_html_e( 'In order to start using the Apple Maps block, you will need to sign up for the Apple Developer Program and create your Maps identifiers, keys, and tokens.', 'maps-block-apple' ); ?></p>
			<p><?php echo esc_html_e( 'Follow the steps below to generate the Private Key, Key ID, and Team ID that you will need to configure the plugin and gain access to the MapKit JS API for the Apple Maps block.', 'maps-block-apple' ); ?></p>
			<h4><?php esc_html_e( '1. Create an Apple Developer account', 'maps-block-apple' ); ?></a></h4>
			<ul>
				<li><a href="https://developer.apple.com/programs/enroll/" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Enroll in the Apple Developer Program as either an individual or organization.', 'maps-block-apple' ); ?></a></li>
				<?php /* translators: %s is the URL of App Store Connect Contracts page. */ ?>
				<li><?php echo wp_kses_post( sprintf( __( 'Sign the Apple Developer Program License Agreement in the <a href="%s" target="_blank" rel="noopener noreferrer">Agreements, Tax, and Banking section of App Store Connect.</a>', 'maps-block-apple' ), esc_url( 'https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/da/jumpTo?page=contracts' ) ) ); ?></li>
			</ul>
			<h4><?php esc_html_e( '2. Create a Maps Identifier and Private Key', 'maps-block-apple' ); ?></a></h4>
			<ul>
				<li><a href="https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Create a Maps ID and a MapKit JS Private Key.', 'maps-block-apple' ); ?></a></li>
				<li><?php echo wp_kses_data( __( 'Copy the Private Key, paste it into the respective field below, and ensure the key includes the <code>-----BEGIN PRIVATE KEY-----</code> and <code>-----END PRIVATE KEY-----</code> lines.', 'maps-block-apple' ) ); ?></li>
				<li><?php echo wp_kses_data( __( 'Open the Key you created above, copy the <code>Key ID</code> value, and paste it into the respective field below.', 'maps-block-apple' ) ); ?></li>
				<li><?php echo wp_kses_data( __( 'Open the Identifier you created above, copy the <code>App ID Prefix</code> value (notice the value is appended with <code>(Team ID)</code>), and paste it into the respective field below.', 'maps-block-apple' ) ); ?></li>
				<li><?php echo wp_kses_data( __( 'Click the <code>Confirm MapKit Credentials</code> button below to gain access to the block options and begin customizing your Apple Maps block!', 'maps-block-apple' ) ); ?></li>
			</ul>
		</section>
	<?php
}


/**
 * Render the Private Key field.
 */
function render_private_key_field() {
	$key  = 'private_key';
	$name = "maps_block_apple[$key]";
	?>
	<div id="authkey-container">
		<textarea name="<?php echo esc_attr( $name ); ?>" class="large-text" rows="10" id="token-gen-authkey" placeholder="<?php esc_html_e( 'paste your Private Key here' ); ?>"><?php echo esc_attr( get_setting( $key ) ); ?></textarea>
	</div>
	<?php
}

/**
 * Render the Developer Team ID field.
 */
function render_team_id_field() {
	$settings = get_option( 'amfwp_settings' );
	$iss      = isset( $settings['token_gen_iss'] ) ? $settings['token_gen_iss'] : '';
	$key      = 'team_id';
	$name     = "maps_block_apple[$key]";
	?>
	<input type="text" name="<?php echo esc_attr( $name ); ?>" class="large-text" id="token-gen-iss" placeholder="<?php esc_html_e( 'paste your 10 characters Team ID here ', 'maps-block-apple' ); ?>" value="<?php echo esc_attr( get_setting( $key ) ); ?>"/>
	<?php
}

/**
 * Render the Key ID field.
 */
function render_key_id_field() {
	$settings = get_option( 'amfwp_settings' );
	$kid      = isset( $settings['token_gen_kid'] ) ? $settings['token_gen_kid'] : '';
	$key      = 'key_id';
	$name     = "maps_block_apple[$key]";
	?>
	<input type="text" name="<?php echo esc_attr( $name ); ?>"class="large-text" id="token-gen-kid" placeholder="<?php esc_html_e( 'paste your 10 characters Key ID here', 'maps-block-apple' ); ?>" value="<?php echo esc_attr( get_setting( $key ) ); ?>"/>
	<?php
}

/**
 * Render the credential status.
 */
function render_credential_status() {
	?>
		<div id="mapkit-credentials-status">
			<span class="spinner is-active"></span>
			<span class="txt"><?php esc_html_e( 'Checking...', 'maps-block-apple' ); ?></span>
		</div>
	<?php
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
	if ( isset( $settings['private_key'] ) ) {
		$new_settings['private_key'] = trim( $settings['private_key'] );
	}

	if ( isset( $settings['key_id'] ) ) {
		$new_settings['key_id'] = sanitize_text_field( $settings['key_id'] );
	}

	if ( isset( $settings['team_id'] ) ) {
		$new_settings['team_id'] = sanitize_text_field( $settings['team_id'] );
	}

	return $new_settings;
}
