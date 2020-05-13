import { Popover, Button } from '@wordpress/components';

export default function SearchResults( props ) {
	const { searchResults, setSearchResults, setAttributes, map } = props;

	if ( 0 === searchResults.length ) {
		return null;
	}

	return (
		<Popover focusOnMount={ false }>
			<ul>
				{ searchResults.map( ( searchResult, index ) => (
					<li key={ index }>
						<Button
							onClick={ () => {
								setAttributes( {
									address: searchResult.formattedAddress,
								} );
								map.current.update( {
									region: searchResult.region,
								} );
								setSearchResults( [] );
							} }
						>
							{ searchResult.formattedAddress }
						</Button>
					</li>
				) ) }
			</ul>
		</Popover>
	);
}
