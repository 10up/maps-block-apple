import {
	Spinner,
	Placeholder,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState, memo } from '@wordpress/element';
import { useRefEffect, useDebounce } from '@wordpress/compose';
import { BlockControls, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

import { AppleMapEdit } from './components/AppleMap';
import EditAuthForm from './components/EditAuthForm';
import InspectorSettings from './inspector-settings';
import IsAdmin from './helper';
import BlockIcon from './block-icon';
import { ResizableMap } from './components/ResizableMap';
import { store as mapsBlockAppleStore } from './store';

const Map = memo((props) => {
	const {
		map,
		isAuthenticated,
		clientId,
		setAttributes,
		setMap,
	} = props;

	/**
	 * render a new map on the provided element if the mapkit object has
	 * already been successfully authenticated
	 */
	const mapRef = useRefEffect((element) => {
		if (isAuthenticated && !map) {
			setMap(new AppleMapEdit(
				element,
				clientId,
				setAttributes
			));
		}

		return () => {
			if (!!map) {
				map.destroy();
				setMap(null);
			}
		}
	})

	return (
		<div ref={mapRef} />
	)
})

export default function MapsBlockAppleEdit(props) {
	const {
		attributes: {
			height,
			latitude,
			longitude,
			markers,
		},
		setAttributes,
		clientId,
		isSelected,
	} = props;

	const [map, setMap] = useState(null);
	const [mapkit, setMapkit] = useState(null);

	const isAuthenticated = useSelect((select) => {
		return select(mapsBlockAppleStore).isAuthenticated();
	});
	const [isLoading, setIsLoading] = useState(true);

	const { updateAuthenticationStatus } = useDispatch(mapsBlockAppleStore);
	const { toggleSelection } = useDispatch(blockEditorStore);

	/**
	 * setup the initial authentication of mapkit and setup all the event listeners
	 *
	 * ensures that the mapkit object gets initialized on the correct window which is
	 * needed for the iframe editors.
	 */
	const setupRef = useRefEffect((element) => {
		// use the mapkit object on the window of the current document
		const mapkit = element.ownerDocument.defaultView.mapkit;

		// return early if the mapkit script has not jet been loaded. The editor iframe
		// will re render the element after the scripts have been loaded
		if (!mapkit) {
			return;
		}

		setMapkit(mapkit);

		/**
		 * MapKit configuration changed due to either a successful initialization or a refresh.
		 *
		 * @typedef mapkitConfigurationChangeEvent
		 * @property {('Initialized'|'Refreshed')} status indicates the configuration change status
		 *
		 * @param {mapkitConfigurationChangeEvent} event
		 */
		const handleConfigurationChange = ({ status }) => {

			function handleSuccessfulAuthentication() {
				setIsLoading(false);
				updateAuthenticationStatus(true);
			}

			switch (status) {
				// MapKit successfully initialized and configured.
				case 'Initialized':
					handleSuccessfulAuthentication();
					break;

				// MapKit configuration updated.
				case 'Refreshed':
					handleSuccessfulAuthentication();
					break;
			}
		};
		mapkit.addEventListener('configuration-change', handleConfigurationChange);

		/**
		 * MapKit failed to initialize
		 *
		 * This either happens when the authorization token provided is invalid or
		 * when the authorization token provided is based on a Maps ID, which has
		 * exceeded its allowed daily usage.
		 *
		 * @typedef mapkitErrorEvent
		 * @property {('Unauthorized'|'Too Many Requests')} status indicates the status response
		 *
		 * @param {mapkitErrorEvent} event
		 */
		const handleAppleMapError = () => {
			setIsLoading(false);
			updateAuthenticationStatus(false);
		};
		mapkit.addEventListener('error', handleAppleMapError);

		/**
		 * handleMapkitReInitialization
		 */
		const InitializeMapkit = () => {
			AppleMapEdit.authenticateMap(mapkit);
		}
		mapkit.addEventListener('reinitialize', InitializeMapkit);

		if (!isAuthenticated) {
			InitializeMapkit();
		}

		return () => {
			mapkit.removeEventListener('configuration-change', handleConfigurationChange);
			mapkit.removeEventListener('error', handleAppleMapError);
			mapkit.removeEventListener('reinitialize', InitializeMapkit);
		};
	});

	/**
	 * listen to changes in the authentication store
	 *
	 * This is needed to cover the case where another map already authenticated mapkit
	 * but this map did not jet have the event listener for the `configuration-change`
	 * event configured and therefore wasn't aware of the updated authentication state
	 */
	useEffect(() => {
		if (isAuthenticated) setIsLoading(false);
	}, [isAuthenticated])

	const debouncedUpdateMarkers = useDebounce((newMarkers) => {
		if (!map) {
			return;
		}

		map.addMarkers(newMarkers);
	}, 300)

	useEffect(() => {
		if (isAuthenticated && !!map) {
			map.update(props.attributes);
		}
	}, [props.attributes, isAuthenticated, map]);

	useEffect(() => debouncedUpdateMarkers(markers), [markers]);

	const blockProps = useBlockProps({ ref: setupRef });

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

	if (!isAuthenticated) {
		return (
			<>
				<InspectorSettings
					{...props}
					isAuthenticated={isAuthenticated}
					map={map}
					mapkit={mapkit}
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
				isAuthenticated={isAuthenticated}
				map={map}
				mapkit={mapkit}
			/>
			<div {...blockProps}>
				<ResizableMap
					onResizeStart={() => {
						toggleSelection(false);
					}}
					onResize={(newHeight) => {
						map.update({ height: newHeight });
					}}
					onResizeStop={(newHeight) => {
						setAttributes({ height: newHeight });
						toggleSelection(true);
					}}
					showHandle={isSelected}
					size={
						{ height }
					}
				/>
				<Map
					map={map}
					setMap={setMap}
					isAuthenticated={isAuthenticated}
					clientId={clientId}
					setAttributes={setAttributes}
				/>
			</div>
		</>
	);
}
