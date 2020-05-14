import { InspectorControls } from '@wordpress/block-editor';
import {
	Spinner,
	Placeholder,
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';

import {
	AppleMapEdit,
	MAP_TYPE_OPTIONS,
	FEATURE_VISIBILITY_OPTIONS,
} from './components/AppleMap';
import EditAuthForm from './components/EditAuthForm';
import SearchResults from './components/SearchResults';

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

	const [ authenticated, setAuthenticated ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ searchString, setSearchString ] = useState( [] );
	const [ searchResults, setSearchResults ] = useState( [] );

	const mapElement = useRef();
	const map = useRef();
	const geocoder = new mapkit.Geocoder();

	useEffect( () => {
		if ( mapkit.authenticated ) {
			setIsLoading( false );
			setAuthenticated( true );
			return;
		}

		const handleConfigurationChange = ( { status } ) => {
			switch ( status ) {
				case 'Initialized':
					setIsLoading( false );
					setAuthenticated( true );
					mapkit.authenticated = true;
					break;
				case 'Refreshed':
					setIsLoading( false );
					setAuthenticated( false );
					mapkit.authenticated = false;
					break;
				default:
					setIsLoading( false );
					setAuthenticated( false );
					break;
			}
		};

		mapkit.addEventListener(
			'configuration-change',
			handleConfigurationChange
		);

		const handleAppleMapError = () => {
			setIsLoading( false );
			setAuthenticated( false );
		};

		mapkit.addEventListener( 'error', handleAppleMapError );

		mapkit.addEventListener( 'reinitialize', () => {
			AppleMapEdit.authenticateMap();
		} );

		AppleMapEdit.authenticateMap();

		return () => {
			mapkit.removeEventListener(
				'configuration-change',
				handleConfigurationChange
			);

			mapkit.removeEventListener( 'error', handleAppleMapError );
		};
	}, [] );

	useEffect( () => {
		if ( authenticated ) {
			map.current = new AppleMapEdit(
				mapElement.current,
				clientId,
				setAttributes
			);
		}
	}, [ authenticated ] );

	useEffect( () => {
		if ( authenticated ) {
			map.current.update( props.attributes );
		}
	}, [ props.attributes, authenticated ] );

	useEffect( () => {
		setSearchString( address );
	}, [ address ] );

	if ( isLoading ) {
		return (
			<Placeholder
				style={ { height: `${ height }px` } }
				label={ __( 'Apple Maps WordPress', 'apple-maps-wordpress' ) }
				icon={ 'location-alt' }
			>
				<Spinner />
			</Placeholder>
		);
	}

	if ( ! authenticated ) {
		return (
			<>
				<InspectorControls>
					<PanelBody>
						<p>
							{ __(
								'You need to authenticate first',
								'apple-maps-wordpress'
							) }
						</p>
					</PanelBody>
				</InspectorControls>
				<Placeholder
					style={ { minHeight: `${ height }px` } }
					label={ __(
						'Authenticate - Apple Maps',
						'apple-maps-wordpress'
					) }
					icon={ 'location-alt' }
					instructions={
						<>
							{ __(
								'In order to use an Apple Map on your website you need to get some credentials from Apple. Here you can find a detailed documentation on how to get these keys: ',
								'apple-maps-wordpress'
							) }
							<a
								href="https://developer.apple.com/documentation/mapkitjs/setting_up_mapkit_js"
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __(
									'Instructions for getting a your Apple Maps Credentials.',
									'apple-maps-wordpress'
								) }
							</a>{ ' ' }
						</>
					}
					isColumnLayout={ true }
				>
					<EditAuthForm />
				</Placeholder>
			</>
		);
	}

	const handleAddressChange = ( value ) => {
		if ( value ) {
			geocoder.lookup( value, geolocate );
		}

		setSearchString( value );
	};

	const geolocate = ( error, data ) => {
		if ( data.results ) {
			setSearchResults( data.results );
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Location Settings', 'apple-maps-wordpress' ) }
				>
					<div>
						<TextControl
							label={ __( 'Address', 'apple-maps-wordpress' ) }
							value={ searchString }
							onChange={ handleAddressChange }
						/>
						<SearchResults
							map={ map }
							setAttributes={ setAttributes }
							searchResults={ searchResults }
							setSearchResults={ setSearchResults }
						/>
					</div>
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
				<PanelBody
					title={ __( 'Display Settings', 'apple-maps-wordpress' ) }
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
						label={ __(
							'Height ( pixels )',
							'apple-maps-wordpress'
						) }
						value={ height }
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Authentication', 'apple-maps-wordpress' ) }
					initialOpen={ false }
				>
					<EditAuthForm />
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
