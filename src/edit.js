import {
	Spinner,
	Placeholder,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useRefEffect, useMergeRefs } from '@wordpress/compose';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { debounce } from 'lodash';

import { AppleMapEdit } from './components/AppleMap';
import EditAuthForm from './components/EditAuthForm';
import InspectorSettings from './inspector-settings';
import IsAdmin from './helper';
import BlockIcon from './block-icon';
import { ResizableMap } from './components/ResizableMap';

export default function MapsBlockAppleEdit(props) {
	const {
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

	const [authenticated, setAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const map = useRef();

	const { toggleSelection } = dispatch('core/block-editor');

	const authRef = useRefEffect((element) => {
		const mapkit = (element.ownerDocument.defaultView ?
			element.ownerDocument.defaultView :
			element.ownerDocument.parentWindow).mapkit;

		if ( !mapkit ) {
			return;
		}

		if (mapkit.authenticated) {
			setIsLoading(false);
			setAuthenticated(true);
			return;
		}

		const handleConfigurationChange = ({ status }) => {
			switch (status) {
				case 'Initialized':
					setIsLoading(false);
					setAuthenticated(true);
					mapkit.authenticated = true;
					break;
				case 'Refreshed':
					setIsLoading(false);
					setAuthenticated(true);
					mapkit.authenticated = true;
					break;
				default:
					setIsLoading(false);
					setAuthenticated(false);
					break;
			}
		};

		mapkit.addEventListener(
			'configuration-change',
			handleConfigurationChange
		);

		const handleAppleMapError = () => {
			setIsLoading(false);
			setAuthenticated(false);
		};

		mapkit.addEventListener('error', handleAppleMapError);

		mapkit.addEventListener('reinitialize', () => {
			AppleMapEdit.authenticateMap(mapkit);
		});

		AppleMapEdit.authenticateMap(mapkit);

		return () => {
			mapkit.removeEventListener(
				'configuration-change',
				handleConfigurationChange
			);

			mapkit.removeEventListener('error', handleAppleMapError);
		};
	});

	const mapRef = useRefEffect((element) => {
		if ( authenticated && ! map.current ) {
			map.current = new AppleMapEdit(
				element,
				clientId,
				setAttributes
			);
		}
	})

	const mergedRefs = useMergeRefs( [ authRef, mapRef ] )

	const debouncedUpdateMarkers = useRef(
		debounce((newMarkers) => {
			if (!map.current) {
				return;
			}

			map.current.addMarkers(newMarkers);
		}, 300)
	).current;

	useEffect(() => {
		if (authenticated && map?.current?.update) {
			map.current.update(props.attributes);
		}
	}, [props.attributes, authenticated]);

	useEffect(() => debouncedUpdateMarkers(markers), [markers]);

	const blockProps = useBlockProps( { ref: authRef } );

	if (isLoading) {
		return (
			<div {...blockProps}>
				<Placeholder
					style={{ height: `${height}px` }}
					label={__('Block for Apple Maps', 'maps-block-apple')}
					icon={BlockIcon}
				>
					<Spinner />
				</Placeholder>
			</div>
		);
	}

	if (!authenticated) {
		return (
			<>
				<InspectorSettings
					{...props}
					authenticated={authenticated}
					map={map}
				/>
				<div {...blockProps}>
					<Placeholder
						style={{ minHeight: `${height}px` }}
						label={__(
							'Confirm access to Apple Maps',
							'maps-block-apple'
						)}
						icon={BlockIcon}
						instructions={
							<IsAdmin
								fallback={__(
									'Sorry, you are not allowed to do that. Please talk to your Administrator.'
								)}
							>
								{__(
									'In order to include an Apple Map on your website you need to confirm your MapKit credentials below. Here is documentation on how to get those credentials: ',
									'maps-block-apple'
								)}
								<a
									href="https://developer.apple.com/documentation/mapkitjs/setting_up_mapkit_js"
									target="_blank"
									rel="noopener noreferrer"
								>
									{__(
										'Instructions for creating your MapKit credentials.',
										'maps-block-apple'
									)}
								</a>{' '}
							</IsAdmin>
						}
						isColumnLayout={true}
					>
						<IsAdmin>
							<EditAuthForm />
						</IsAdmin>
					</Placeholder>
				</div>
			</>
		);
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="location"
						title={__('Add Marker', 'apple-maps-wordpress')}
						onClick={() => {
							setAttributes({
								markers: [
									...markers,
									{
										latitude,
										longitude,
										title: 'Title',
										id: Symbol('identifier for the marker'),
									},
								],
							});
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorSettings
				{...props}
				authenticated={authenticated}
				map={map}
			/>
			<div {...blockProps}>
				<ResizableMap
					onResizeStart={() => {
						toggleSelection(false);
					}}
					onResize={(newHeight) => {
						setAttributes({ height: newHeight });
					}}
					onResizeStop={(newHeight) => {
						toggleSelection(true);
						setAttributes({ height: newHeight });
					}}
					showHandle={isSelected}
				/>
				<div
					ref={mergedRefs}
					data-map-type={mapType}
					data-latitude={latitude}
					data-longitude={longitude}
					data-rotation={rotation}
					data-zoom={zoom}
					data-shows-map-type-control={showsMapTypeControl}
					data-is-rotation-enabled={isRotationEnabled}
					data-shows-compass={showsCompass}
					data-is-zoom-enabled={isZoomEnabled}
					data-shows-zoom-control={showsZoomControl}
					data-is-scroll-enabled={isScrollEnabled}
					data-shows-scale={showsScale}
					style={{ height: `${height}px` }}
				>
					{markers.map((marker, index) => (
						<div
							key={index}
							className={'marker-annotation'}
							data-latitude={marker.latitude}
							data-longitude={marker.longitude}
							data-title={marker.title}
							data-subtitle={marker.subtitle}
							data-color={marker.color}
							data-glyph-color={marker.glyphColor}
						/>
					))}
				</div>
			</div>
		</>
	);
}
