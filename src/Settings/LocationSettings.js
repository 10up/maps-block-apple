import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import SearchResults from '../components/SearchResults';
import LocationInfo from '../components/LocationInfo';

/**
 * Location Settings Sidebar Panel
 *
 * @param {Object} props
 */
export default function LocationSettings(props) {
	const {
		map,
		mapkit,
		attributes: { latitude, longitude, address },
		setAttributes,
	} = props;
	const [searchString, setSearchString] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		// clear search string when the address changes
		setSearchString('');
	}, [address]);

	if (!mapkit) {
		return null;
	}

	const geocoder = new mapkit.Geocoder();

	/**
	 *
	 * @param {string} searchTerm current search term
	 */
	const handleSearchStringChange = (searchTerm) => {
		if (searchTerm) {
			geocoder.lookup(searchTerm, handleSearchResults);
		}

		setSearchString(searchTerm);
	};

	/**
	 * Handle apple geocoder lookup response
	 *
	 * @param {*}     error error from apple geocoder
	 * @param {Array} data  data from apple geocoder
	 */
	const handleSearchResults = (error, data) => {
		if (data.results) {
			setSearchResults(data.results);
		}
	};

	return (
		<PanelBody title={__('Location Settings', 'maps-block-apple')}>
			<LocationInfo latitude={latitude} longitude={longitude} />
			<div>
				<TextControl
					label={__('Search for a Location', 'maps-block-apple')}
					value={searchString}
					onChange={handleSearchStringChange}
					autoComplete='off'
				/>
				<SearchResults
					map={map}
					setAttributes={setAttributes}
					searchResults={searchResults}
					setSearchResults={setSearchResults}
				/>
			</div>
		</PanelBody>
	);
}
