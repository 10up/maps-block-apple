/**
 * Stand-in for Apple's MapKit JS, served by the E2E suite in place of
 * https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js so tests never reach Apple
 * and need no real MapKit credentials.
 *
 * It implements only the parts of the MapKit API the plugin calls. `init()`
 * asks the plugin's authorization callback for a token, records it on
 * `window.mapkitStub.tokens`, and then behaves as MapKit does for a token it
 * accepts (`configuration-change`, status "Initialized") or rejects (`error`).
 * Here a token is "accepted" when it has the three dot-separated parts of a
 * JWT; whether Apple accepts it is outside what this suite can check.
 *
 * Maps created on the page are recorded on `window.mapkitStub.maps`.
 */
( () => {
	const stub = { tokens: [], maps: [] };

	const FeatureVisibility = {
		Adaptive: 'adaptive',
		Hidden: 'hidden',
		Visible: 'visible',
	};

	class Coordinate {
		constructor( latitude, longitude ) {
			this.latitude = latitude;
			this.longitude = longitude;
		}
	}

	class MarkerAnnotation extends EventTarget {
		constructor( coordinate, options ) {
			super();
			Object.assign( this, options, { coordinate } );
		}
	}

	class Map extends EventTarget {
		constructor( element, options ) {
			super();
			Object.assign( this, options, {
				element,
				annotations: [],
				_impl: { zoomLevel: 0 },
			} );
			stub.maps.push( this );
		}

		addAnnotations( annotations ) {
			this.annotations.push( ...annotations );
		}

		removeAnnotations( annotations ) {
			this.annotations = this.annotations.filter(
				( annotation ) => ! annotations.includes( annotation )
			);
		}

		setCenterAnimated( center ) {
			this.center = center;
		}

		setRegionAnimated() {}

		setRotationAnimated( rotation ) {
			this.rotation = rotation;
		}

		destroy() {
			stub.maps = stub.maps.filter( ( map ) => map !== this );
		}
	}

	Map.MapTypes = {
		Standard: 'standard',
		MutedStandard: 'mutedStandard',
		Hybrid: 'hybrid',
		Satellite: 'satellite',
	};

	class Geocoder {
		lookup( query, callback ) {
			callback( null, { results: [] } );
		}
	}

	const mapkit = new EventTarget();

	Object.assign( mapkit, {
		Coordinate,
		FeatureVisibility,
		Geocoder,
		Map,
		MarkerAnnotation,
		init( { authorizationCallback } ) {
			authorizationCallback( ( token ) => {
				stub.tokens.push( token );

				const accepted =
					typeof token === 'string' && token.split( '.' ).length === 3;
				const event = new Event(
					accepted ? 'configuration-change' : 'error'
				);
				event.status = accepted ? 'Initialized' : 'Unauthorized';
				mapkit.dispatchEvent( event );
			} );
		},
	} );

	window.mapkit = mapkit;
	window.mapkitStub = stub;
} )();
