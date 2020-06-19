import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	MAP_TYPE_OPTIONS,
	FEATURE_VISIBILITY_OPTIONS,
} from '../components/AppleMap';

export default function DisplaySettings( props ) {
	const {
		attributes: {
			mapType,
			height,
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
	} = props;

	return (
		<PanelBody title={ __( 'Display Settings', 'apple-maps-wordpress' ) }>
			<SelectControl
				label={ __( 'Map Type', 'apple-maps-wordpress' ) }
				options={ MAP_TYPE_OPTIONS }
				value={ mapType }
				onChange={ ( value ) => setAttributes( { mapType: value } ) }
			/>
			<ToggleControl
				label={ __( 'Show Map Type Control', 'apple-maps-wordpress' ) }
				checked={ showsMapTypeControl }
				onChange={ ( value ) =>
					setAttributes( { showsMapTypeControl: value } )
				}
			/>
			<RangeControl
				label={ __( 'Zoom', 'apple-maps-wordpress' ) }
				value={ zoom }
				onChange={ ( value ) => setAttributes( { zoom: value } ) }
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
					label={ __( 'Show Zoom Control', 'apple-maps-wordpress' ) }
					checked={ showsZoomControl }
					onChange={ ( value ) =>
						setAttributes( { showsZoomControl: value } )
					}
				/>
			) }
			<ToggleControl
				label={ __( 'Rotation Enabled', 'apple-maps-wordpress' ) }
				checked={ isRotationEnabled }
				onChange={ ( value ) =>
					setAttributes( { isRotationEnabled: value } )
				}
			/>
			{ isRotationEnabled && (
				<SelectControl
					label={ __( 'Show Compass', 'apple-maps-wordpress' ) }
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
				onChange={ ( value ) => setAttributes( { showsScale: value } ) }
			/>
			<TextControl
				label={ __( 'Height ( pixels )', 'apple-maps-wordpress' ) }
				value={ height }
				onChange={ ( value ) => setAttributes( { height: value } ) }
			/>
		</PanelBody>
	);
}
