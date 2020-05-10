/*global mapkit*/
/*global Event*/

import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

const { MarkerAnnotation, Coordinate, Map, FeatureVisibility } = mapkit;

class AppleMap {
	constructor( element ) {
		this.element = element;
		this.mapOptions = {};

		this.init();
	}

	init() {
		this.createMap();
		this.addMarker();
	}

	createMap() {
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

	addMarker() {
		const sfo = new Coordinate( 37.616934, -122.38379 );

		// Setting properties on creation:
		const sfoAnnotation = new MarkerAnnotation( sfo, {
			color: '#f4a56d',
			title: 'SFO',
			glyphText: '✈️',
		} );

		this.map.addAnnotation( sfoAnnotation );
	}

	static authenticateMap() {
		apiFetch( { path: 'AppleMapsWordPress/v1/GetJWT/' } )
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
		this.clientId = clientId;
		this.setAttributes = setAttributes;
	}

	/**
	 * Initialize Edit version of AppleMap
	 */
	init() {
		super.init();
		this.addListeners();
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
		} = options;

		if ( mapType !== this.mapOptions.mapType ) {
			this.map.mapType = options.mapType;
		}

		if ( zoom !== this.map._impl.zoomLevel ) {
			this.map._impl.zoomLevel = zoom;
		}

		if ( rotation !== this.mapOptions.rotation ) {
			this.map.rotation = Number( rotation );
		}

		if (
			latitude !== this.mapOptions.latitude ||
			longitude !== this.mapOptions.longitude
		) {
			this.map.center = new Coordinate( latitude, longitude );
		}

		if ( showsMapTypeControl !== this.mapOptions.showsMapTypeControl ) {
			this.map.showsMapTypeControl = showsMapTypeControl;
		}

		if ( isRotationEnabled !== this.mapOptions.isRotationEnabled ) {
			this.map.isRotationEnabled = isRotationEnabled;
		}

		if ( showsCompass !== this.mapOptions.showsCompass ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isZoomEnabled !== this.mapOptions.isZoomEnabled ) {
			this.map.isZoomEnabled = isZoomEnabled;
		}

		if ( showsZoomControl !== this.mapOptions.showsZoomControl ) {
			this.map.showsZoomControl = showsZoomControl;
		}

		if ( showsCompass !== this.mapOptions.showsCompass ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isScrollEnabled !== this.mapOptions.isScrollEnabled ) {
			this.map.isScrollEnabled = isScrollEnabled;
		}

		if ( showsScale !== this.mapOptions.showsScale ) {
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
