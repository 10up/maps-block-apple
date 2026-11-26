/**
 * Settings screen: saving MapKit credentials and the status it reports.
 */

/**
 * Internal dependencies
 */
import {
	test,
	expect,
	decodeJwt,
	generateCredentials,
	saveCredentials,
	SETTINGS_PAGE,
	SETTINGS_QUERY,
} from '../../utils/helpers';
import type { Credentials } from '../../utils/helpers';

const credentials = generateCredentials();

test.describe( 'MapKit credentials settings', () => {
	test.afterEach( async ( { requestUtils } ) => {
		await saveCredentials( requestUtils );
	} );

	/**
	 * Fills in the settings form and submits it, as an administrator would.
	 *
	 * @param admin  Admin fixture.
	 * @param page   Page fixture.
	 * @param values Values to type into the three credential fields.
	 */
	async function submitCredentials( admin, page, values: Credentials ) {
		await admin.visitAdminPage( SETTINGS_PAGE, SETTINGS_QUERY );
		await page.locator( '#token-gen-authkey' ).fill( values.private_key );
		await page.locator( '#token-gen-kid' ).fill( values.key_id );
		await page.locator( '#token-gen-iss' ).fill( values.team_id );
		await page
			.getByRole( 'button', { name: 'Confirm MapKit Credentials' } )
			.click();
		await page.waitForURL( /settings-updated=true/ );
	}

	test( 'authorizes MapKit with a token for the saved credentials', async ( {
		admin,
		page,
	} ) => {
		await submitCredentials( admin, page, credentials );

		await expect( page.locator( '#mapkit-credentials-status' ) ).toHaveText(
			'Authorized!'
		);

		const tokens = await page.evaluate( () => window.mapkitStub.tokens );
		expect( tokens ).toHaveLength( 1 );

		const { header, claims } = decodeJwt( tokens[ 0 ] );
		expect( header.kid ).toBe( credentials.key_id );
		expect( claims.iss ).toBe( credentials.team_id );
	} );

	test( 'reports a missing key ID', async ( { admin, page } ) => {
		await submitCredentials( admin, page, { ...credentials, key_id: '' } );

		await expect( page.locator( '#mapkit-credentials-status' ) ).toHaveText(
			'Missing Key ID'
		);
	} );
} );
