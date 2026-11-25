/**
 * Apple Maps block in the block editor.
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

test.describe( 'Apple Maps block', () => {
	test.afterEach( async ( { requestUtils } ) => {
		await saveCredentials( requestUtils );
		await requestUtils.deleteAllPosts();
	} );

	test( 'renders a map at the block location once MapKit is authorized', async ( {
		admin,
		editor,
		requestUtils,
	} ) => {
		await saveCredentials( requestUtils, generateCredentials() );

		await admin.createNewPost();
		await editor.insertBlock( { name: 'tenup/maps-block-apple' } );

		const block = editor.canvas.locator(
			'[data-type="tenup/maps-block-apple"]'
		);
		await expect( block ).toBeVisible();

		await expect
			.poll( () =>
				block.evaluate( ( element ) =>
					window.mapkitStub.maps
						.filter( ( map ) => element.contains( map.element ) )
						.map( ( { center } ) => [
							center.latitude,
							center.longitude,
						] )
				)
			)
			.toEqual( [ [ 51.48762585296625, -0.1326724377053381 ] ] );

		await expect(
			block.getByText( 'Confirm access to Apple Maps' )
		).toHaveCount( 0 );
	} );

	test( 'asks for MapKit credentials when none are saved', async ( {
		admin,
		editor,
	} ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: 'tenup/maps-block-apple' } );

		await expect(
			editor.canvas
				.locator( '[data-type="tenup/maps-block-apple"]' )
				.getByText( 'Confirm access to Apple Maps' )
		).toBeVisible();
	} );
} );
