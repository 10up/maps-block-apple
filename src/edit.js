import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';

import {
	AppleMapEdit,
	MAP_TYPE_OPTIONS,
	FEATURE_VISIBILITY_OPTIONS,
} from './components/AppleMap';

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
			showsMapTypeControl,
			isRotationEnabled,
			showsCompass,
			isZoomEnabled,
			showsZoomControl,
			isScrollEnabled,
			showsScale,
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
		map.current.update( props.attributes );
	}, [ props.attributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings', 'apple-maps-wordpress' ) }
				>
					<SelectControl
						label={ __( 'MapType', 'apple-maps-wordpress' ) }
						options={ MAP_TYPE_OPTIONS }
						value={ mapType }
						onChange={ ( value ) =>
							setAttributes( { mapType: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show MapType Controll',
							'apple-maps-wordpress'
						) }
						checked={ showsMapTypeControl }
						onChange={ ( value ) =>
							setAttributes( { showsMapTypeControl: value } )
						}
					/>
					<RangeControl
						label={ __( 'Zoom', 'apple-maps-wordpress' ) }
						value={ zoom }
						onChange={ ( value ) =>
							setAttributes( { zoom: value } )
						}
						min={ 0 }
						max={ 20 }
						step={ 0.5 }
					/>
					<ToggleControl
						label={ __( 'Zoom Enabled', 'apple-maps-wordpress' ) }
						checked={ isZoomEnabled }
						onChange={ ( value ) =>
							setAttributes( { isZoomEnabled: value } )
						}
					/>
					{ isZoomEnabled && (
						<ToggleControl
							label={ __(
								'Show Zoom Controll',
								'apple-maps-wordpress'
							) }
							checked={ showsZoomControl }
							onChange={ ( value ) =>
								setAttributes( { showsZoomControl: value } )
							}
						/>
					) }
					<ToggleControl
						label={ __(
							'Rotation Enabled',
							'apple-maps-wordpress'
						) }
						checked={ isRotationEnabled }
						onChange={ ( value ) =>
							setAttributes( { isRotationEnabled: value } )
						}
					/>
					{ isRotationEnabled && (
						<SelectControl
							label={ __(
								'Show Compas',
								'apple-maps-wordpress'
							) }
							options={ FEATURE_VISIBILITY_OPTIONS }
							value={ showsCompass }
							onChange={ ( value ) =>
								setAttributes( { showsCompass: value } )
							}
						/>
					) }
					<ToggleControl
						label={ __( 'Scroll Enabled', 'apple-maps-wordpress' ) }
						checked={ isScrollEnabled }
						onChange={ ( value ) =>
							setAttributes( { isScrollEnabled: value } )
						}
					/>
					<SelectControl
						label={ __( 'Show Scale', 'apple-maps-wordpress' ) }
						options={ FEATURE_VISIBILITY_OPTIONS }
						value={ showsScale }
						onChange={ ( value ) =>
							setAttributes( { showsScale: value } )
						}
					/>
					<TextControl
						label={ __( 'Address', 'apple-maps-wordpress' ) }
						value={ address }
						onChange={ ( value ) =>
							setAttributes( { address: value } )
						}
					/>
					<TextControl
						label={ __(
							'Height ( pixels )',
							'apple-maps-wordpress'
						) }
						value={ height }
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
					/>
					<TextControl
						readonly="readonly"
						label={ __( 'Latitude', 'apple-maps-wordpress' ) }
						value={ latitude }
					/>
					<TextControl
						readonly="readonly"
						label={ __( 'Longitude', 'apple-maps-wordpress' ) }
						value={ longitude }
					/>
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
				data-shows-map-type-control={ showsMapTypeControl }
				data-is-rotation-enabled={ isRotationEnabled }
				data-shows-compass={ showsCompass }
				data-is-zoom-enabled={ isZoomEnabled }
				data-shows-zoom-control={ showsZoomControl }
				data-is-scroll-enabled={ isScrollEnabled }
				data-shows-scale={ showsScale }
				style={ { height: `${ height }px` } }
			/>
		</>
	);
}
