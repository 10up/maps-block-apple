/**
 * Apple Maps block content saved by a released version still opens as a
 * valid block with its settings intact.
 */

/**
 * Internal dependencies
 */
import { test, expect } from '../../utils/helpers';
import { CONTENT_1_1_6, SAVED_ATTRIBUTES } from '../../fixtures/saved-content';

const RELEASES = [ { release: '1.1.6', content: CONTENT_1_1_6 } ];

test.describe( 'Saved Apple Maps block content', () => {
	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllPosts();
	} );

	for ( const { release, content } of RELEASES ) {
		test( `content saved by ${ release } opens as a valid block with its settings`, async ( {
			admin,
			page,
			requestUtils,
		} ) => {
			const post = await requestUtils.createPost( {
				title: `Saved by ${ release }`,
				content,
				status: 'draft',
			} );

			await admin.editPost( post.id );

			const blocks = await page.waitForFunction( () => {
				const editorBlocks = window.wp.data
					.select( 'core/block-editor' )
					.getBlocks();

				return editorBlocks.length
					? editorBlocks.map( ( { name, isValid, attributes } ) => ( {
							name,
							isValid,
							attributes,
					  } ) )
					: false;
			} );

			const [ block ] = await blocks.jsonValue();

			expect( block.name ).toBe( 'tenup/maps-block-apple' );
			expect( block.isValid ).toBe( true );
			expect( block.attributes ).toMatchObject( SAVED_ATTRIBUTES );
			expect( block.attributes.markers ).toEqual( [
				expect.objectContaining( {
					latitude: 40.7128,
					longitude: -74.006,
					title: 'Office',
				} ),
			] );
		} );
	}
} );
