import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';

import { AppleMapEdit } from './components/AppleMap';
import InspectorSettings from './inspector-settings';
import IsAdmin from './helper';
import BlockIcon from './block-icon';

export default function MapsBlockAppleEdit( props ) {
	const {
		className,
		attributes: {
			mapType,
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

	const mapElement = useRef();
	const map = useRef();

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

	if ( isLoading ) {
		return (
			<Placeholder
				style={ { height: `${ height }px` } }
				label={ __( 'Block for Apple Maps', 'maps-block-apple' ) }
				icon={ BlockIcon }
			>
				<Spinner />
			</Placeholder>
		);
	}

	if ( ! authenticated ) {
		const { settingsURL } = global._mbaData;
		return (
			<>
				<InspectorSettings
					{ ...props }
					authenticated={ authenticated }
					map={ map }
				/>
				<Placeholder
					style={ { minHeight: `${ height }px` } }
					label={ __(
						'Confirm access to Apple Maps',
						'maps-block-apple'
					) }
					icon={ BlockIcon }
					instructions={
						<IsAdmin
							fallback={ __(
								'Sorry, you are not allowed to do that. Please talk to your Administrator.'
							) }
						>
							{ __(
								'In order to start using the Apple Maps block, you will need to sign up for the Apple Developer Program and create your Maps identifiers, keys, and tokens. ',
								'maps-block-apple'
							) }
							<a href={ settingsURL }>
								{ __(
									'Click here to go to the settings screen for setup instructions.',
									'maps-block-apple'
								) }
							</a>{ ' ' }
						</IsAdmin>
					}
					isColumnLayout={ true }
				/>
			</>
		);
	}

	return (
		<>
			<InspectorSettings
				{ ...props }
				authenticated={ authenticated }
				map={ map }
			/>
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
