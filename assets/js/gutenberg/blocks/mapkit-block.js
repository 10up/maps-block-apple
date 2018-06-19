/*global wp*/
/*eslint-disable no-unused-vars*/
import classnames from 'classnames';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { BlockControls, BlockAlignmentToolbar } = wp.editor; // Import registerBlockType() from wp.blocks

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
	title:  __( 'Apple Map for WordPress' ),
	icon: 'location',  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		divControl: {
			type: 'string',
			source: 'children',
			selector: 'div',
			default: 'map'
		},
		blockAlignment: {
			type: 'string',
			default: 'wide',
		}
	},
	getEditWrapperProps( { blockAlignment } ) {
		if ( blockAlignment === 'left' || blockAlignment === 'right' || blockAlignment === 'full' ) {
			return { 'data-align': blockAlignment };
		}
	},
	edit: props => {
		const { blockAlignment, className, setAttributes } = props;
		return (
			<div className={ className }>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ blockAlignment => setAttributes( {blockAlignment} ) }
					/>
				</BlockControls>
				<div id="map">Map Placeholder</div>
			</div>
		);
	},
	save: props => {
		const { blockAlignment } = props.attributes;
		const classes = classnames( `align${blockAlignment}` );
		return (
			<div className={ classes } id="map">Map Save</div>
		);
	},
} );
