/*global wp*/
import AppleMapEdit from './edit';
import attributes from './attributes';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register Basic Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {WPBlock}           The block, if it has been successfully registered; otherwise `undefined`.
 */
registerBlockType( 'tenup/apple-map-for-wordpress',{
	title:  __( 'Apple Maps for WordPress' ),
	icon: 'location',
	category: 'embed',
	attributes: attributes,
	edit: AppleMapEdit,
	save: props => {
		const { width, height , latitude, longitude, latitudeDelta, longitudeDelta, mapID } = props.attributes;
		const style = { width: width + '%', height: height + 'px' };
		return (
			<div
				className="apple-maps-for-wordpress"
				id={mapID}
				style={style}
				data-lat={latitude}
				data-long={longitude}
				data-latd={latitudeDelta}
				data-longd={longitudeDelta}
			>
			</div>
		);
	},
} );
