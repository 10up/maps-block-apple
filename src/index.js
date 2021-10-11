/**
 * External dependencies
 */
const { Map, FeatureVisibility } = mapkit;

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import MapsBlockAppleEdit from './edit';
import MapsBlockAppleSave from './save';
import BlockIcon from './block-icon';
import metadata from './../block.json';

registerBlockType( metadata, {
	icon: BlockIcon,
	attributes: {
		...metadata.attributes,
		mapType: {
			type: 'string',
			default: Map.MapTypes.Standard,
		},
		showsCompass: {
			type: 'string',
			default: FeatureVisibility.Adaptive,
		},
		showsScale: {
			type: 'string',
			default: FeatureVisibility.Adaptive,
		},
	},
	edit: MapsBlockAppleEdit,
	save: MapsBlockAppleSave,
} );
