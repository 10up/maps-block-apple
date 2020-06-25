import { PanelBody, Tip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditMarker from '../components/EditMarker';

export default function LocationSettings( props ) {
	const {
		attributes: { markers },
		setAttributes,
	} = props;

	const updateMarker = ( index ) => ( marker ) => {
		const newMarkers = [ ...markers ];
		newMarkers[ index ] = marker;

		setAttributes( { markers: newMarkers } );
	};

	const removeMarker = ( index ) => () => {
		const newMarkers = [ ...markers ];
		newMarkers.splice( index, 1 );
		setAttributes( { markers: newMarkers } );
	};

	return markers.length ? (
		<PanelBody title={ __( 'Marker Settings', 'apple-maps-wordpress' ) }>
			{ markers.map( ( marker, index ) => {
				return (
					<EditMarker
						key={ index }
						marker={ marker }
						update={ updateMarker( index ) }
						remove={ removeMarker( index ) }
					/>
				);
			} ) }

			<Tip>
				{ __(
					'You can move a marker by long pressing on it',
					'maps-block-apple'
				) }
			</Tip>
		</PanelBody>
	) : null;
}
