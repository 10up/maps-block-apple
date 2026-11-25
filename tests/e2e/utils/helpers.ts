/**
 * Shared E2E helpers.
 *
 * Every spec imports `test` and `expect` from here instead of from
 * `@wordpress/e2e-test-utils-playwright`. The extended `test` serves a MapKit
 * JS stand-in (./mapkit-stub.js) in place of Apple's CDN script and aborts
 * every other request that leaves the test site, so no test reaches Apple or
 * needs real MapKit credentials.
 */

/**
 * External dependencies
 */
import { generateKeyPairSync } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * WordPress dependencies
 */
import {
	test as base,
	expect,
} from '@wordpress/e2e-test-utils-playwright';
import type { RequestUtils } from '@wordpress/e2e-test-utils-playwright';

const MAPKIT_URL = 'https://cdn.apple-mapkit.com/';
const MAPKIT_STUB = readFileSync(
	path.join( __dirname, 'mapkit-stub.js' ),
	'utf8'
);

export const SETTINGS_PAGE = 'options-general.php';
export const SETTINGS_QUERY = 'page=block-for-apple-maps';

/** Credentials as stored in the `maps_block_apple` option. */
export type Credentials = {
	private_key: string;
	key_id: string;
	team_id: string;
};

/**
 * Builds credentials that pass the plugin's checks: a freshly generated P-256
 * private key in PKCS #8 PEM form (the format Apple issues) and 10-character
 * key and team IDs. They are not Apple credentials.
 */
export function generateCredentials(): Credentials {
	const { privateKey } = generateKeyPairSync( 'ec', {
		namedCurve: 'P-256',
		privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		publicKeyEncoding: { type: 'spki', format: 'pem' },
	} );

	return {
		private_key: privateKey,
		key_id: 'KEYID12345',
		team_id: 'TEAMID1234',
	};
}

/**
 * Saves the MapKit credentials through the core settings REST route.
 *
 * @param requestUtils Request utils.
 * @param credentials  Credentials to store; omit to clear them.
 */
export async function saveCredentials(
	requestUtils: RequestUtils,
	credentials: Credentials = { private_key: '', key_id: '', team_id: '' }
) {
	await requestUtils.rest( {
		method: 'POST',
		path: '/wp/v2/settings',
		data: { maps_block_apple: credentials },
	} );
}

/**
 * Decodes the header and claims of a JWT without verifying it.
 *
 * @param token Encoded JWT.
 */
export function decodeJwt( token: string ) {
	const [ header, claims ] = token
		.split( '.' )
		.slice( 0, 2 )
		.map( ( segment ) =>
			JSON.parse( Buffer.from( segment, 'base64url' ).toString() )
		);

	return { header, claims };
}

export const test = base.extend< { mapkitStub: void } >( {
	mapkitStub: [
		async ( { context, baseURL }, use ) => {
			const siteOrigin = new URL( baseURL as string ).origin;

			await context.route(
				( url ) => url.origin !== siteOrigin,
				( route ) => {
					if ( route.request().url().startsWith( MAPKIT_URL ) ) {
						return route.fulfill( {
							contentType: 'application/javascript',
							body: MAPKIT_STUB,
						} );
					}

					return route.abort( 'blockedbyclient' );
				}
			);

			await use();
		},
		{ auto: true },
	],
} );

export { expect };
