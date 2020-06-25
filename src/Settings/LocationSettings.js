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
export default function LocationSettings( props ) {
	const {
		map,
		attributes: { latitude, longitude, address },
		setAttributes,
	} = props;

	const [ searchString, setSearchString ] = useState( [] );
	const [ searchResults, setSearchResults ] = useState( [] );

	const geocoder = new mapkit.Geocoder();

	useEffect( () => {
		// clear search string when the address changes
		setSearchString( '' );
	}, [ address ] );

	/**
	 *
	 * @param {string} searchTerm current search term
	 */
	const handleSearchStringChange = ( searchTerm ) => {
		if ( searchTerm ) {
			geocoder.lookup( searchTerm, handleSearchResults );
		}

		setSearchString( searchTerm );
	};

	/**
	 * Handle apple geocoder lookup response
	 *
	 * @param {*} error error from apple geocoder
	 * @param {Array} data data from apple geocoder
	 */
	const handleSearchResults = ( error, data ) => {
		if ( data.results ) {
			setSearchResults( data.results );
		}
	};

	return (
		<PanelBody title={ __( 'Location Settings', 'maps-block-apple' ) }>
			<div>
				<TextControl
					label={ __( 'Search Place', 'maps-block-apple' ) }
					value={ searchString }
					onChange={ handleSearchStringChange }
				/>
				<SearchResults
					map={ map }
					setAttributes={ setAttributes }
					searchResults={ searchResults }
					setSearchResults={ setSearchResults }
				/>
			</div>
			<LocationInfo latitude={ latitude } longitude={ longitude } />
		</PanelBody>
	);
}
