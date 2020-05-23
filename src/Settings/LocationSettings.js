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
		<PanelBody title={ __( 'Location Settings', 'apple-maps-wordpress' ) }>
			<div>
				<TextControl
					label={ __( 'Address', 'apple-maps-wordpress' ) }
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
				readonly="readonly"
				label={ __( 'Latitude', 'apple-maps-wordpress' ) }
				value={ latitude }
			/>
			<TextControl
				readonly="readonly"
				label={ __( 'Longitude', 'apple-maps-wordpress' ) }
				value={ longitude }
			/>
		</PanelBody>
	);
}
