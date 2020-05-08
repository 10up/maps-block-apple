import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'tenup/apple-maps-wordpress', {
	title: __( 'Apple Maps', 'apple-maps-wordpress' ),
	category: 'common',
	attributes: {
		address: {
			type: 'string',
			default: '',
		},
		height: {
			type: 'string',
			default: '450',
		},
		latitude: {
			type: 'string',
			default: '',
		},
		longitude: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
} );
