import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';

import { AppleMapEdit, MAP_TYPE_OPTIONS } from './components/AppleMap';

export default function AppleMapsWordPressEdit( props ) {
	const {
		className,
		attributes: {
			mapType,
			address,
			height,
			latitude,
			longitude,
			rotation,
			zoom,
		},
		setAttributes,
		clientId,
	} = props;

	const mapElement = useRef();
	const map = useRef();

	useEffect( () => {
		map.current = new AppleMapEdit(
			mapElement.current,
			clientId,
			setAttributes
		);
	}, [] );

	useEffect( () => {
		map.current.update( {
			mapType,
			address,
			height,
			latitude,
			longitude,
			rotation,
			zoom,
		} );
	}, [ mapType, address, height, latitude, longitude, rotation, zoom ] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings', 'apple-maps-wordpress' ) }
				>
					<PanelRow>
						<SelectControl
							label={ __( 'MapType', 'apple-maps-wordpress' ) }
							options={ MAP_TYPE_OPTIONS }
							value={ mapType }
							onChange={ ( newMapType ) =>
								setAttributes( { mapType: newMapType } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={ __( 'Zoom', 'apple-maps-wordpress' ) }
							value={ zoom }
							onChange={ ( newZoom ) =>
								setAttributes( { zoom: newZoom } )
							}
							min={ 0 }
							max={ 20 }
							step={ 0.5 }
						/>
					</PanelRow>
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
			<div
				ref={ mapElement }
				className={ className }
				data-map-type={ mapType }
				data-latitude={ latitude }
				data-longitude={ longitude }
				data-rotation={ rotation }
				data-zoom={ zoom }
				style={ { height: `${ height }px` } }
			/>
		</>
	);
}
