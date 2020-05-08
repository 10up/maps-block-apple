/*global mapkit*/

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import AppleMapsWordPressEdit from './edit';
import AppleMapsWordPressSave from './save';

const { Map } = mapkit;

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
			type: 'number',
		},
		longitude: {
			type: 'number',
		},
		rotation: {
			type: 'number',
			default: 0,
		},
		zoom: {
			type: 'number',
			default: 15,
		},
		mapType: {
			type: 'string',
			default: Map.MapTypes.Standard,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit: AppleMapsWordPressEdit,
	save: AppleMapsWordPressSave,
} );
