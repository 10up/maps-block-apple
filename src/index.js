import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'tenup/apple-maps-wordpress', {
	title: __( 'Apple Maps', 'apple-maps-wordpress' ),
	category: 'common',
	edit,
	save,
} );
