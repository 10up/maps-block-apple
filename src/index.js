/**
 * External dependencies
 */
const { Map, FeatureVisibility } = mapkit;

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import AppleMapsWordPressEdit from './edit';
import AppleMapsWordPressSave from './save';
import BlockIcon from './block-icon';

registerBlockType('tenup/apple-maps-wordpress', {
	title: __('Apple Maps', 'apple-maps-wordpress'),
	description: __('Add a Apple Map to your Page', 'apple-maps-wordpress'),
	category: 'embed',
	icon: BlockIcon,
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
			default: 51.48762585296625,
		},
		longitude: {
			type: 'number',
			default: -0.1326724377053381,
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
		showsMapTypeControl: {
			type: 'boolean',
			default: true,
		},
		isRotationEnabled: {
			type: 'boolean',
			default: true,
		},
		showsCompass: {
			type: 'string',
			default: FeatureVisibility.Adaptive,
		},
		isZoomEnabled: {
			type: 'boolean',
			default: true,
		},
		showsZoomControl: {
			type: 'boolean',
			default: true,
		},
		isScrollEnabled: {
			type: 'boolean',
			default: true,
		},
		showsScale: {
			type: 'string',
			default: FeatureVisibility.Adaptive,
		},
	},
	supports: {
		align: ['wide', 'full'],
	},
	edit: AppleMapsWordPressEdit,
	save: AppleMapsWordPressSave,
});
