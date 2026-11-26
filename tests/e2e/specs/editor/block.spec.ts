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

	test( 'saves credentials confirmed from the block placeholder', async ( {
		admin,
		editor,
		requestUtils,
	} ) => {
		const credentials = generateCredentials();

		await admin.createNewPost();
		await editor.insertBlock( { name: 'tenup/maps-block-apple' } );

		const block = editor.canvas.locator(
			'[data-type="tenup/maps-block-apple"]'
		);
		await block
			.getByLabel( 'Please enter your Private Key' )
			.fill( credentials.private_key );
		await block
			.getByLabel( 'Please enter your Key ID' )
			.fill( credentials.key_id );
		await block
			.getByLabel( 'Please enter your Team ID' )
			.fill( credentials.team_id );
		await block
			.getByRole( 'button', { name: 'Confirm MapKit Credentials' } )
			.click();

		await expect
			.poll( async () => {
				const settings = await requestUtils.rest( {
					path: '/wp/v2/settings',
				} );
				return settings.maps_block_apple;
			} )
			.toEqual( {
				private_key: credentials.private_key.trim(),
				key_id: credentials.key_id,
				team_id: credentials.team_id,
			} );
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
