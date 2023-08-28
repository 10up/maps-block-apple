import apiFetch from '@wordpress/api-fetch';
import { select, dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

class AppleMap {
	constructor(element) {
		this.element = element;
		this.mapOptions = {};
		this.markerElements =
			this.element.querySelectorAll('.marker-annotation');
		this.markers = [...this.markerElements].map((markerElement) => {
			const {
				latitude,
				longitude,
				title,
				subtitle,
				color,
				glyphColor,
				glyphImage,
			} = markerElement.dataset;

			return {
				latitude: Number(latitude),
				longitude: Number(longitude),
				title: title || '',
				subtitle: subtitle || '',
				color: color || null,
				glyphColor: glyphColor || null,
				glyphImage: glyphImage || null,
			};
		});

		// get the mapkit object on the current window object to account for iframe editors
		this.mapkit = element.ownerDocument.defaultView.mapkit;

		if (!this.mapkit) return;

		this.init();
	}

	init() {
		this.createMap();
		this.addMarkers(this.markers);
	}

	createMap() {
		const {
			mapType,
			latitude,
			longitude,
			rotation,
			zoom,
			showsMapTypeControl = true,
			isRotationEnabled = true,
			showsCompass,
			isZoomEnabled = true,
			showsZoomControl = true,
			isScrollEnabled = true,
			showsScale,
		} = this.element.dataset;

		const center = new this.mapkit.Coordinate(
			Number(latitude) || 51.48762585296625,
			Number(longitude) || -0.1326724377053381
		);

		this.mapOptions = {
			center,
			rotation: Number(rotation) || 0,
			mapType: mapType || this.mapkit.Map.MapTypes.Satellite,
			showsMapTypeControl: showsMapTypeControl === 'true',
			isRotationEnabled: isRotationEnabled === 'true',
			isZoomEnabled: isZoomEnabled === 'true',
			showsZoomControl: showsZoomControl === 'true',
			isScrollEnabled: isScrollEnabled === 'true',
			showsScale: showsScale || this.mapkit.FeatureVisibility.Adaptive,
		};

		if (this.mapOptions.isRotationEnabled) {
			this.mapOptions.showsCompass =
				showsCompass || this.mapkit.FeatureVisibility.Adaptive;
		}

		this.map = new this.mapkit.Map(this.element, this.mapOptions);
		this.map._impl.zoomLevel = Number(zoom) || 15;
	}

	/**
	 * Add a MarkerAnnotation at the provided coordinated
	 *
	 * @param {Array} markers markers
	 */
	addMarkers(markers) {
		this.clearMarkers();

		const markerAnnotations = [];

		markers.forEach((item, index) => {
			const {
				latitude,
				longitude,
				title,
				subtitle,
				titleVisibility,
				subtitleVisibility,
				color,
				glyphColor,
				glyphText,
				glyphImage,
			} = item;
			const position = new this.mapkit.Coordinate(
				Number(latitude),
				Number(longitude)
			);
			const markerAnnotationOptions = {
				title,
				subtitle: subtitle || null,
				titleVisibility:
					titleVisibility || this.mapkit.FeatureVisibility.Visible,
				subtitleVisibility:
					subtitleVisibility || this.mapkit.FeatureVisibility.Visible,
				color: color || 'green',
				glyphColor: glyphColor || 'white',
				glyphText: glyphText || '',
				draggable: !!this.isEditor,
			};
			// Use custom glyph image if provided.
			if (glyphImage) {
				markerAnnotationOptions.glyphImage = { 1: glyphImage };
			}
			const marker = new this.mapkit.MarkerAnnotation(
				position,
				markerAnnotationOptions
			);

			if (this.setAttributes) {
				marker.addEventListener('drag-end', (event) => {
					const {
						target: { coordinate },
					} = event;
					const newMarkers = [...markers];
					newMarkers[index].latitude = coordinate.latitude;
					newMarkers[index].longitude = coordinate.longitude;

					this.setAttributes({ markers: newMarkers });
				});

				/*
				 * Focus the Marker setting when the marker is selected
				 *
				 * marker.addEventListener( 'select', ( event ) => {
				 * 		const identifier =
				 * 			this.map.annotations.indexOf( event.target );
				 * } );
				 */
			}

			markerAnnotations.push(marker);
		});

		this.map.addAnnotations(markerAnnotations);
	}

	/**
	 * clear markers from the map
	 */
	clearMarkers() {
		this.map.removeAnnotations(this.map.annotations);
	}

	static authenticateMap(mapkit) {
		apiFetch({ path: 'MapsBlockApple/v1/GetJWT/' })
			.then(() => {
				mapkit.init({
					authorizationCallback(done) {
						/**
						 * JWT only lives for 30 mins. Calling it again here to
						 * allow mapkit to get new token when needed.
						 *
						 * @see https://github.com/10up/maps-block-apple/issues/48
						 * @see https://github.com/10up/maps-block-apple/pull/52
						 */
						apiFetch({ path: 'MapsBlockApple/v1/GetJWT/' }).then(
							done
						);
					},
				});
			})
			.catch((error) => {
				dispatch('core/notices').createErrorNotice(error.message, {
					id: error.code,
					isDismissible: true,
					type: 'snackbar',
				});
				mapkit.dispatchEvent(new Event('error'));
			});
	}
}

class AppleMapEdit extends AppleMap {
	/**
	 * Constructor of the AppleMapEdit Class
	 *
	 * @param {HTMLElement} element       Element to initialize the map on
	 * @param {string}      clientId      ClientId of the Block
	 * @param {Function}    setAttributes to update attributes of the block
	 */
	constructor(element, clientId, setAttributes) {
		super(element);
		this.isEditor = true;
		this.clientId = clientId;
		this.setAttributes = setAttributes;

		this.initEdit();
	}

	/**
	 * Initialize Edit version of AppleMap
	 */
	initEdit() {
		this.addListeners();
		this.addMarkers(this.markers);
	}

	destroy() {
		if (!this.map) return;
		this.map.destroy();
	}

	/**
	 * Attach different listeners to handle interactions
	 * with the map and modify block settings accordingly
	 */
	addListeners() {
		// select the block when the user interacts with the map
		this.map.element.addEventListener('click', () => {
			dispatch('core/block-editor').selectBlock(this.clientId);
		});

		// change the mapType attribute when it gets changed inside the map
		this.map.addEventListener('map-type-change', () => {
			this.setAttributes({ mapType: this.map.mapType });
		});

		// update the region settings when the map gets moved around
		this.map.addEventListener('region-change-end', () => {
			this.setAttributes({
				rotation: this.map.rotation,
				latitude: this.map.center.latitude,
				longitude: this.map.center.longitude,
				zoom: this.map._impl.zoomLevel,
			});
		});
	}

	/**
	 * Update options of the map
	 *
	 * @param {Object} options Settings to update
	 */
	update(options) {
		const {
			mapType,
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
			region,
			height,
		} = options;

		if (height) {
			this.element.style.height = `${height}px`;
		}

		if (!this.map) return;

		if (region && region !== '') {
			this.map.setRegionAnimated(region, true);
		}

		if (mapType && mapType !== this?.map?.mapType) {
			this.map.mapType = options.mapType;
		}

		if (zoom && zoom !== this.map?._impl?.zoomLevel) {
			this.map._impl.zoomLevel = zoom;
		}

		if (rotation && rotation !== this?.map?.rotation) {
			this.map.setRotationAnimated(Number(rotation));
		}

		if (
			latitude &&
			longitude &&
			(latitude !== this?.map?.center?.latitude ||
				longitude !== this?.map?.center?.longitude)
		) {
			this.map.setCenterAnimated(
				new this.mapkit.Coordinate(latitude, longitude)
			);
		}

		if (
			typeof showsMapTypeControl !== 'undefined' &&
			showsMapTypeControl !== this?.map?.showsMapTypeControl
		) {
			this.map.showsMapTypeControl = !!showsMapTypeControl;
		}

		if (
			typeof isRotationEnabled !== 'undefined' &&
			isRotationEnabled !== this?.map?.isRotationEnabled
		) {
			this.map.isRotationEnabled = !!isRotationEnabled;
		}

		if (showsCompass !== this?.map?.showsCompass) {
			if (this.map.isRotationEnabled) {
				this.map.showsCompass =
					showsCompass || this.mapkit.FeatureVisibility.Adaptive;
			}
		}

		if (
			typeof isZoomEnabled !== 'undefined' &&
			isZoomEnabled !== this?.map?.isZoomEnabled
		) {
			this.map.isZoomEnabled = !!isZoomEnabled;
		}

		if (
			typeof showsZoomControl !== 'undefined' &&
			showsZoomControl !== this?.map?.showsZoomControl
		) {
			this.map.showsZoomControl = !!showsZoomControl;
		}

		if (
			typeof isScrollEnabled !== 'undefined' &&
			isScrollEnabled !== this?.map?.isScrollEnabled
		) {
			this.map.isScrollEnabled = !!isScrollEnabled;
		}

		if (showsScale !== this?.map?.showsScale) {
			this.map.showsScale =
				showsScale || this.mapkit.FeatureVisibility.Adaptive;
		}
	}
}

// MapTypes formatted to be used as options in SelectControl dropdown
const MAP_TYPE_OPTIONS = Object.keys(mapkit.Map.MapTypes).map((mapType) => {
	const label =
		mapType === 'MutedStandard' ? __('Muted', 'maps-block-apple') : mapType;
	return {
		label,
		value: mapkit.Map.MapTypes[mapType],
	};
});

// FeatureVisibility options formatted to be used as options in SelectControl dropdown
const FEATURE_VISIBILITY_OPTIONS = Object.keys(mapkit.FeatureVisibility).map(
	(featureVisibility) => {
		return {
			label: featureVisibility,
			value: mapkit.FeatureVisibility[featureVisibility],
		};
	}
);

export { AppleMap, AppleMapEdit, MAP_TYPE_OPTIONS, FEATURE_VISIBILITY_OPTIONS };
