<?php
/**
 * This file is used to validate the environment.
 *
 * @package tenup\Maps_Block_Apple
 * @since   1.2.0
 */

namespace tenup\Maps_Block_Apple;

use TenUP_Maps_Block_Apple_Environment_Validation_Tools\Validator;

$tenup_lib_path = __DIR__ . '/../10up-lib/';
if ( ! is_readable( $tenup_lib_path . 'wp-compat-validation-tool/src/Validator.php' ) ) {
	return false;
}

require_once $tenup_lib_path . 'wp-compat-validation-tool/src/Validator.php';

$compat_checker = new Validator();
$compat_checker
	->set_plugin_name( 'Block for Apple Maps' )
	->set_php_min_required_version( '7.4' );

if ( ! $compat_checker->is_plugin_compatible() ) {
	return false;
}

return true;
