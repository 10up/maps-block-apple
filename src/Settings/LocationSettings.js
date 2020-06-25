import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import SearchResults from '../components/SearchResults';
import LocationInfo from '../components/LocationInfo';

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
		setSearchString( address );
	}, [ address ] );

	const handleAddressChange = ( value ) => {
		if ( value ) {
			geocoder.lookup( value, geolocate );
		}

		setSearchString( value );
	};

	const geolocate = ( error, data ) => {
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
					onChange={ handleAddressChange }
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
