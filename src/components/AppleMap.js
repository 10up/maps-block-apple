/*global mapkit*/

import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

const {
	MarkerAnnotation,
	Coordinate,
	Map,
	FeatureVisibility,
	CoordinateRegion,
	CoordinateSpan,
} = mapkit;

class AppleMap {
	constructor( element ) {
		this.element = element;
		this.mapOptions = {};

		this.init();
	}

	init() {
		this.constructor.authenticateMap();

		const center = new Coordinate(
			Number( this.element.dataset.latitude ) || 30.616946271618716,
			Number( this.element.dataset.longitude ) || -122.38372029405731
		);

		this.mapOptions = {
			center,
			rotation: Number( this.element.dataset.rotation ) || 0,
			mapType: this.element.dataset.mapType || Map.MapTypes.Satellite,
			showsMapTypeControl: true,
			isRotationEnabled: true,
			showsCompass: FeatureVisibility.Adaptive,
			isZoomEnabled: true,
			showsZoomControl: true,
			isScrollEnabled: true,
			showsScale: FeatureVisibility.Adaptive,
		};

		this.createMap();
		this.map._impl.zoomLevel = Number( this.element.dataset.zoom ) || 15;
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
		const { mapType, latitude, longitude, rotation, zoom } = options;

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
