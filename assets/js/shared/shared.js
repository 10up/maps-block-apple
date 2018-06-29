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
					map.region = new mapkit.CoordinateRegion(
						new mapkit.Coordinate( parseInt( maps[i].getAttribute( 'data-lat' ) ), parseInt( maps[i].getAttribute( 'data-long' ) ) ),
						new mapkit.CoordinateSpan( parseInt( maps[i].getAttribute( 'data-latd' ) ), parseInt( maps[i].getAttribute( 'data-longd' ) ) )
					);
				}
				break;
			case 'Refreshed':
				// Mapkit configuration was updated.
				break;
	}
} );
