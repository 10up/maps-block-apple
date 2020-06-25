import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

const { Coordinate, Map, FeatureVisibility, MarkerAnnotation } = mapkit;

class AppleMap {
	constructor( element ) {
		this.element = element;
		this.mapOptions = {};
		this.markerElements = this.element.querySelectorAll(
			'.marker-annotation'
		);
		this.markers = [ ...this.markerElements ].map( ( markerElement ) => {
			const {
				latitude,
				longitude,
				title,
				subtitle,
				color,
				glyphColor,
			} = markerElement.dataset;
			return {
				latitude: Number( latitude ),
				longitude: Number( longitude ),
				title: title || '',
				subtitle: subtitle || '',
				color: color || null,
				glyphColor: glyphColor || null,
			};
		} );

		this.init();
	}

	init() {
		this.createMap();

		this.clearMarkers();

		this.addMarkers( this.markers );
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

		const center = new Coordinate(
			Number( latitude ) || 51.48762585296625,
			Number( longitude ) || -0.1326724377053381
		);

		this.mapOptions = {
			center,
			rotation: Number( rotation ) || 0,
			mapType: mapType || Map.MapTypes.Satellite,
			showsMapTypeControl: showsMapTypeControl === 'true',
			isRotationEnabled: isRotationEnabled === 'true',
			showsCompass: showsCompass || FeatureVisibility.Adaptive,
			isZoomEnabled: isZoomEnabled === 'true',
			showsZoomControl: showsZoomControl === 'true',
			isScrollEnabled: isScrollEnabled === 'true',
			showsScale: showsScale || FeatureVisibility.Adaptive,
		};

		this.map = new Map( this.element, this.mapOptions );
		this.map._impl.zoomLevel = Number( zoom ) || 15;
	}

	/**
	 * Add a MarkerAnnotation at the provided coordinated
	 *
	 * @param {Array} markers markers
	 */
	addMarkers( markers ) {
		this.clearMarkers();

		const markerAnnotations = [];

		markers.forEach( ( item, index ) => {
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
			} = item;
			const position = new Coordinate(
				Number( latitude ),
				Number( longitude )
			);

			const marker = new MarkerAnnotation( position, {
				title,
				subtitle: subtitle || null,
				titleVisibility: titleVisibility || FeatureVisibility.Visible,
				subtitleVisibility:
					subtitleVisibility || FeatureVisibility.Visible,
				color: color || 'green',
				glyphColor: glyphColor || 'white',
				glyphText: glyphText || '',
				draggable: !! this.isEditor,
			} );

			if ( this.setAttributes ) {
				marker.addEventListener( 'drag-end', ( event ) => {
					const {
						target: { coordinate },
					} = event;
					const newMarkers = [ ...markers ];
					newMarkers[ index ].latitude = coordinate.latitude;
					newMarkers[ index ].longitude = coordinate.longitude;

					this.setAttributes( { markers: newMarkers } );
				} );

				/*
				 * Focus the Marker setting when the marker is selected
				 *
				 * marker.addEventListener( 'select', ( event ) => {
				 * 		const identifier =
				 * 			this.map.annotations.indexOf( event.target );
				 * } );
				 */
			}

			markerAnnotations.push( marker );
		} );

		this.map.addAnnotations( markerAnnotations );
	}

	/**
	 * clear markers from the map
	 */
	clearMarkers() {
		this.map.removeAnnotations( this.map.annotations );
	}

	static authenticateMap() {
		apiFetch( { path: 'MapsBlockApple/v1/GetJWT/' } )
			.then( ( token ) => {
				mapkit.init( {
					authorizationCallback( done ) {
						done( token );
					},
				} );
			} )
			.catch( ( error ) => {
				dispatch( 'core/notices' ).createErrorNotice( error.message, {
					isDismissible: true,
					type: 'snackbar',
				} );
				mapkit.dispatchEvent( new Event( 'error' ) );
			} );
	}
}

class AppleMapEdit extends AppleMap {
	/**
	 * Constructor of the AppleMapEdit Class
	 *
	 * @param {HTMLElement} element Element to initialize the map on
	 * @param {string} clientId ClientId of the Block
	 * @param {Function} setAttributes to update attributes of the block
	 */
	constructor( element, clientId, setAttributes ) {
		super( element );
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
		this.addMarkers( this.markers );
	}

	/**
	 * Attach different listeners to handle interactions
	 * with the map and modify block settings accordingly
	 */
	addListeners() {
		// select the block when the user interacts with the map
		this.map.element.addEventListener( 'click', () => {
			dispatch( 'core/block-editor' ).selectBlock( this.clientId );
		} );

		// change the mapType attribute when it gets changed inside the map
		this.map.addEventListener( 'map-type-change', () => {
			this.setAttributes( { mapType: this.map.mapType } );
		} );

		// update the region settings when the map gets moved arround
		this.map.addEventListener( 'region-change-end', () => {
			this.setAttributes( {
				rotation: this.map.rotation,
				latitude: this.map.center.latitude,
				longitude: this.map.center.longitude,
				zoom: this.map._impl.zoomLevel,
			} );
		} );
	}

	/**
	 * Update options of the map
	 *
	 * @param {Object} options Settings to update
	 */
	update( options ) {
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
		} = options;

		if ( region && region !== '' ) {
			this.map.setRegionAnimated( region, true );
		}

		if ( mapType && mapType !== this.map.mapType ) {
			this.map.mapType = options.mapType;
		}

		if ( zoom && zoom !== this.map._impl.zoomLevel ) {
			this.map._impl.zoomLevel = zoom;
		}

		if ( rotation && rotation !== this.map.rotation ) {
			this.map.rotation = Number( rotation );
		}

		if (
			latitude &&
			longitude &&
			( latitude !== this.map.center.latitude ||
				longitude !== this.map.center.longitude )
		) {
			this.map.center = new Coordinate( latitude, longitude );
		}

		if ( showsMapTypeControl !== this.map.showsMapTypeControl ) {
			this.map.showsMapTypeControl = showsMapTypeControl;
		}

		if ( isRotationEnabled !== this.map.isRotationEnabled ) {
			this.map.isRotationEnabled = isRotationEnabled;
		}

		if ( showsCompass !== this.map.showsCompass ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isZoomEnabled !== this.map.isZoomEnabled ) {
			this.map.isZoomEnabled = isZoomEnabled;
		}

		if ( showsZoomControl !== this.map.showsZoomControl ) {
			this.map.showsZoomControl = showsZoomControl;
		}

		if ( showsCompass !== this.map.showsCompass ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isScrollEnabled !== this.map.isScrollEnabled ) {
			this.map.isScrollEnabled = isScrollEnabled;
		}

		if ( showsScale !== this.map.showsScale ) {
			this.map.showsScale = showsScale;
		}
	}
}

// MapTypes formated to be used as options in SelectControl dropdowns
const MAP_TYPE_OPTIONS = Object.keys( Map.MapTypes ).map( ( mapType ) => {
	return {
		label: mapType,
		value: Map.MapTypes[ mapType ],
	};
} );

// FeatureVisibility options formated to be used as options in SelectControl dropdowns
const FEATURE_VISIBILITY_OPTIONS = Object.keys( FeatureVisibility ).map(
	( featureVisibility ) => {
		return {
			label: featureVisibility,
			value: FeatureVisibility[ featureVisibility ],
		};
	}
);

export { AppleMap, AppleMapEdit, MAP_TYPE_OPTIONS, FEATURE_VISIBILITY_OPTIONS };
