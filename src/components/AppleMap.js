/*global mapkit*/

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
		this.constructor.authenticateMap();

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
			Number( latitude ) || 30.616946271618716,
			Number( longitude ) || -122.38372029405731
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

		this.createMap();
		this.map._impl.zoomLevel = Number( zoom ) || 15;
		this.addMarker();
	}

	createMap() {
		this.map = new Map( this.element, this.mapOptions );
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
		mapkit.init( {
			authorizationCallback( done ) {
				apiFetch( { path: 'AppleMapsWordPress/v1/GetJWT/' } )
					.then( done )
					.catch( console.error );
			},
		} );
	}
}

class AppleMapEdit extends AppleMap {
	constructor( element, clientId, setAttributes ) {
		super( element );
		this.clientId = clientId;
		this.setAttributes = setAttributes;
	}

	init() {
		super.init();

		this.addListeners();
	}

	addListeners() {
		this.map.element.addEventListener( 'click', () => {
			dispatch( 'core/block-editor' ).selectBlock( this.clientId );
		} );

		this.map.addEventListener( 'map-type-change', () => {
			this.setAttributes( { mapType: this.map.mapType } );
		} );

		this.map.addEventListener( 'region-change-end', () => {
			this.setAttributes( {
				rotation: this.map.rotation,
				latitude: this.map.center.latitude,
				longitude: this.map.center.longitude,
				zoom: this.map._impl.zoomLevel,
			} );
		} );
	}

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

		if ( mapType ) {
			this.map.mapType = options.mapType;
		}

		if ( zoom ) {
			this.map._impl.zoomLevel = zoom;
		}

		if ( rotation ) {
			this.map.rotation = Number( rotation );
		}

		if ( latitude && longitude ) {
			this.map.center = new Coordinate( latitude, longitude );
		}

		if ( showsMapTypeControl !== undefined ) {
			this.map.showsMapTypeControl = showsMapTypeControl;
		}

		if ( isRotationEnabled !== undefined ) {
			this.map.isRotationEnabled = isRotationEnabled;
		}

		if ( showsCompass !== undefined ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isZoomEnabled !== undefined ) {
			this.map.isZoomEnabled = isZoomEnabled;
		}

		if ( showsZoomControl !== undefined ) {
			this.map.showsZoomControl = showsZoomControl;
		}

		if ( showsCompass !== undefined ) {
			this.map.showsCompass = showsCompass;
		}

		if ( isScrollEnabled !== undefined ) {
			this.map.isScrollEnabled = isScrollEnabled;
		}

		if ( showsScale !== undefined ) {
			this.map.showsScale = showsScale;
		}
	}
}

const MAP_TYPE_OPTIONS = Object.keys( Map.MapTypes ).map( ( mapType ) => {
	return {
		label: mapType,
		value: Map.MapTypes[ mapType ],
	};
} );

const FEATURE_VISIBILITY_OPTIONS = Object.keys( FeatureVisibility ).map(
	( featureVisibility ) => {
		return {
			label: featureVisibility,
			value: FeatureVisibility[ featureVisibility ],
		};
	}
);

export { AppleMap, AppleMapEdit, MAP_TYPE_OPTIONS, FEATURE_VISIBILITY_OPTIONS };
