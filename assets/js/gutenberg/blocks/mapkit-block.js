/*global wp*/
/*eslint-disable no-unused-vars*/
import classnames from 'classnames';
import AppleMapEdit from './edit';
import attributes from './attributes';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks



/**
 * Register Basic Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'tenup/apple-map-for-wordpress',{
	title:  __( 'Apple Maps for WordPress' ),
	icon: 'location',  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: attributes,
	edit: AppleMapEdit,
	save: props => {
		const { blockAlignment, width, height , latitude, longitude, latitudeDelta, longitudeDelta, mapID } = props.attributes;
		const classes = classnames( `align${blockAlignment}`, 'apple-maps-for-wordpress' );
		const style = { width, height };
		return (
			<div
				className={ classes }
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
