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
import MapsBlockAppleEdit from './edit';
import MapsBlockAppleSave from './save';
import BlockIcon from './block-icon';

registerBlockType( 'tenup/maps-block-apple', {
	title: __( 'Apple Maps', 'maps-block-apple' ),
	description: __( 'Add an Apple Map to your site.', 'maps-block-apple' ),
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
		markers: {
			type: 'array',
			default: [],
		},
	},
	example: {
		attributes: {
			latitude: 51.48762585296625,
			longitude: -0.1326724377053381,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit: MapsBlockAppleEdit,
	save: MapsBlockAppleSave,
} );
