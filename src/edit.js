import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function edit( props ) {
	const {
		className,
		attributes: { address, height, latitude, longitude },
		setAttributes,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings', 'apple-maps-wordpress' ) }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Address', 'apple-maps-wordpress' ) }
							value={ address }
							onChange={ ( newAddress ) =>
								setAttributes( { address: newAddress } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __(
								'Height ( pixels )',
								'apple-maps-wordpress'
							) }
							value={ height }
							onChange={ ( newHeight ) =>
								setAttributes( { height: newHeight } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							readonly="readonly"
							label={ __( 'Latitude', 'apple-maps-wordpress' ) }
							value={ latitude }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							readonly="readonly"
							label={ __( 'Longitude', 'apple-maps-wordpress' ) }
							value={ longitude }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>This is a Demo</div>
		</>
	);
}
