/*global mapkit,AMFWP*/
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
				//Mapkit was initialized and configured.
				maps = document.getElementsByClassName( 'apple-maps-for-wordpress' );
				for ( let i = 0; i < maps.length; i++ ) {
					const map = new mapkit.Map( document.getElementById( maps[i].id ) );
					map.showsMapTypeControl = false;
					map.showsCompass = mapkit.FeatureVisibility.Hidden;
					console.log(  parseInt( maps[i].getAttribute( 'data-latd' ) ), parseInt( maps[i].getAttribute( 'data-longd' ) )  );
					map.region = new mapkit.CoordinateRegion(
						new mapkit.Coordinate( parseFloat( maps[i].getAttribute( 'data-lat' ) ), parseFloat( maps[i].getAttribute( 'data-long' ) ) ),
						new mapkit.CoordinateSpan( parseFloat( maps[i].getAttribute( 'data-latd' ) ), parseFloat( maps[i].getAttribute( 'data-longd' ) ) )
					);
				}
				break;
			case 'Refreshed':
				// Mapkit configuration was updated.
				break;
	}
} );
