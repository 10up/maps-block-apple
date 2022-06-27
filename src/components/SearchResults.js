import { Popover, Button, NavigableMenu } from '@wordpress/components';

export default function SearchResults(props) {
	const { searchResults, setSearchResults, setAttributes, map } = props;

	if (0 === searchResults.length) {
		return null;
	}

	const handleItemSelection = (index) => {
		const searchResult = searchResults[index];
		setAttributes({
			address: searchResult.formattedAddress,
		});
		map.update({
			region: searchResult.region,
		});
		setSearchResults([]);
	};

	return (
		<Popover focusOnMount={false} noArrow={false} position="bottom right">
			<NavigableMenu
				style={{ width: '250px', margin: '6px' }}
				onNavigate={handleItemSelection}
			>
				<ul>
					{searchResults.map((searchResult, index) => (
						<li key={searchResult.muid}>
							<Button
								onClick={() => handleItemSelection(index)}
								style={{
									borderRadius: '4px',
									textAlign: 'start',
									width: '100%',
								}}
							>
								{searchResult.formattedAddress}
							</Button>
						</li>
					))}
				</ul>
			</NavigableMenu>
		</Popover>
	);
}
