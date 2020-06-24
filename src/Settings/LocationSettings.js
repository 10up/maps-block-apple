import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import SearchResults from '../components/SearchResults';

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
					label={ __( 'Address', 'maps-block-apple' ) }
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
			<TextControl
				readOnly={true}
				label={ __( 'Latitude', 'maps-block-apple' ) }
				value={ latitude }
			/>
			<TextControl
				readOnly={true}
				label={ __( 'Longitude', 'maps-block-apple' ) }
				value={ longitude }
			/>
		</PanelBody>
	);
}
