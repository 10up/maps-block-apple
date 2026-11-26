/**
 * Apple Maps block on the front end, as a logged-out visitor sees it.
 */

/**
 * Internal dependencies
 */
import {
	test,
	expect,
	generateCredentials,
	saveCredentials,
} from '../../utils/helpers';
import { CONTENT_1_1_6 } from '../../fixtures/saved-content';

test.describe( 'Apple Maps block on the front end', () => {
	test.use( { storageState: { cookies: [], origins: [] } } );

	test.afterEach( async ( { requestUtils } ) => {
		await saveCredentials( requestUtils );
		await requestUtils.deleteAllPosts();
	} );

	test( 'builds the map from the saved block settings and markers', async ( {
		page,
		requestUtils,
	} ) => {
		await saveCredentials( requestUtils, generateCredentials() );
		const post = await requestUtils.createPost( {
			title: 'Map post',
			content: CONTENT_1_1_6,
			status: 'publish',
		} );

		await page.goto( post.link );

		// The visitor's browser fetched a token from the public route.
		await expect
			.poll( () =>
				page.evaluate( () => window.mapkitStub.tokens.length )
			)
			.toBeGreaterThan( 0 );

		const maps = await page
			.locator( '.wp-block-tenup-maps-block-apple' )
			.evaluate( ( element ) =>
				window.mapkitStub.maps
					.filter( ( map ) => map.element === element )
					.map( ( map ) => ( {
						center: [ map.center.latitude, map.center.longitude ],
						mapType: map.mapType,
						zoom: map._impl.zoomLevel,
						annotations: map.annotations.map( ( annotation ) => ( {
							position: [
								annotation.coordinate.latitude,
								annotation.coordinate.longitude,
							],
							title: annotation.title,
							color: annotation.color,
						} ) ),
					} ) )
			);

		expect( maps ).toEqual( [
			{
				center: [ 40.7128, -74.006 ],
				mapType: 'hybrid',
				zoom: 12,
				annotations: [
					{
						position: [ 40.7128, -74.006 ],
						title: 'Office',
						color: 'red',
					},
				],
			},
		] );
	} );
} );
