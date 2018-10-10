/*global mapkit,AMFWP, wp*/
const { longLifeToken } = AMFWP;

mapkit.init( {
	authorizationCallback: function ( done ) {
		done( longLifeToken );
	}
} );

mapkit.addEventListener( 'configuration-change', function( event ) {
	let maps;
	switch ( event.status ) {
			case 'Initialized':
				//MapKit JS was initialized and configured.
				if ( wp.data ) {
					wp.data.dispatch( 'apple-maps-for-wordpress' ).mapKitReady();
				} else {
					maps = document.getElementsByClassName( 'apple-maps-for-wordpress' );
					for ( let i = 0; i < maps.length; i++ ) {
						const map = new mapkit.Map( document.getElementById( maps[i].id ) );
						map.showsMapTypeControl = false;
						map.showsCompass = mapkit.FeatureVisibility.Hidden;
						map.region = new mapkit.CoordinateRegion(
							new mapkit.Coordinate( parseFloat( maps[i].getAttribute( 'data-lat' ) ), parseFloat( maps[i].getAttribute( 'data-long' ) ) ),
							new mapkit.CoordinateSpan( parseFloat( maps[i].getAttribute( 'data-latd' ) ), parseFloat( maps[i].getAttribute( 'data-longd' ) ) )
						);
					}
				}
				break;
			case 'Refreshed':
				// MapKit JS configuration was updated.
				break;
	}
} );

mapkit.addEventListener( 'error', e => {
	switch ( e.status ) {
			case 'Unauthorized' :
				if ( wp.data )  {
					wp.data.dispatch( 'apple-maps-for-wordpress' ).authFailed();
				}
				break;
			case 'Too Many Requests':
				break;
	}
} );
