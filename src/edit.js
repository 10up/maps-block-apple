import {
	Spinner,
	Placeholder,
	Toolbar,
	ToolbarButton,
	ResizableBox,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';

import { AppleMapEdit } from './components/AppleMap';
import EditAuthForm from './components/EditAuthForm';
import InspectorSettings from './inspector-settings';
import IsAdmin from './helper';
import BlockIcon from './block-icon';
import { debounce } from 'lodash';

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
			markers,
		},
		setAttributes,
		clientId,
		isSelected,
	} = props;

	const [ authenticated, setAuthenticated ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( true );

	const mapElement = useRef();
	const map = useRef();

	const { toggleSelection } = dispatch( 'core/block-editor' );

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
					setAuthenticated( true );
					mapkit.authenticated = true;
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

	const debouncedUpdateMarkers = useRef(
		debounce( ( newMarkers ) => {
			if ( ! map.current ) {
				return;
			}

			map.current.addMarkers( newMarkers );
		}, 300 )
	).current;

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

	useEffect( () => debouncedUpdateMarkers( markers ), [ markers ] );

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
								'In order to include an Apple Map on your website you need to confirm your MapKit credentials below. Here is documentation on how to get those credentials: ',
								'maps-block-apple'
							) }
							<a
								href="https://developer.apple.com/documentation/mapkitjs/setting_up_mapkit_js"
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __(
									'Instructions for creating your MapKit credentials.',
									'maps-block-apple'
								) }
							</a>{ ' ' }
						</IsAdmin>
					}
					isColumnLayout={ true }
				>
					<IsAdmin>
						<EditAuthForm />
					</IsAdmin>
				</Placeholder>
			</>
		);
	}

	return (
		<>
			<BlockControls>
				<Toolbar>
					<ToolbarButton
						icon="location"
						title={ __( 'Add Marker', 'apple-maps-wordpress' ) }
						onClick={ () => {
							setAttributes( {
								markers: [
									...markers,
									{
										latitude,
										longitude,
										title: 'Title',
										id: Symbol(
											'identifier for the marker'
										),
									},
								],
							} );
						} }
					/>
				</Toolbar>
			</BlockControls>
			<InspectorSettings
				{ ...props }
				authenticated={ authenticated }
				map={ map }
			/>
			<ResizableMap
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResize={ (newHeight) => {
					setAttributes( { height: newHeight } )
				} }
				onResizeStop={ ( newHeight ) => {
					toggleSelection( true );
					setAttributes( { height: newHeight } );
				} }
				showHandle={ isSelected }
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
			>
				{ markers.map( ( marker, index ) => (
					<div
						key={ index }
						className={ 'marker-annotation' }
						data-latitude={ marker.latitude }
						data-longitude={ marker.longitude }
						data-title={ marker.title }
						data-subtitle={ marker.subtitle }
						data-color={ marker.color }
						data-glyph-color={ marker.glyphColor }
					/>
				) ) }
			</div>
		</>
	);
}

const RESIZABLE_BOX_ENABLE_OPTION = {
	top: false,
	right: false,
	bottom: true,
	left: false,
	topRight: false,
	bottomRight: false,
	bottomLeft: false,
	topLeft: false,
};

const MAP_MIN_HEIGHT = 100;

function ResizableMap( {
	onResizeStart,
	onResize,
	onResizeStop,
	...props
} ) {
	const [ isResizing, setIsResizing ] = useState( false );

	return (
		<ResizableBox
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
			className={ `apple-maps-block__resize-container ${isResizing ? 'is-resizing' : ''}` }
			enable={ RESIZABLE_BOX_ENABLE_OPTION }
			onResizeStart={ ( _event, _direction, elt ) => {
				onResizeStart( elt.clientHeight );
				onResize( elt.clientHeight );
			} }
			onResize={ ( _event, _direction, elt ) => {
				onResize( elt.clientHeight );
				if ( ! isResizing ) {
					setIsResizing( true );
				}
			} }
			onResizeStop={ ( _event, _direction, elt ) => {
				onResizeStop( elt.clientHeight );
				setIsResizing( false );
			} }
			minHeight={ MAP_MIN_HEIGHT }
			{ ...props }
		/>
	);
}
