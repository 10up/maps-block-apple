import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function LocationSettings( props ) {
	const {
		attributes: { markers },
		setAttributes,
	} = props;

	return markers.length ? (
		<PanelBody title={ __( 'Marker Settings', 'apple-maps-wordpress' ) }>
			{ markers.map( ( marker, index ) => {
				return (
					<Button
						key={ index }
						onClick={ () => {
							const newMarkers = [ ...markers ];
							newMarkers.splice( index, 1 );

							setAttributes( { markers: newMarkers } );
						} }
					>
						{ marker.title }
					</Button>
				);
			} ) }
		</PanelBody>
	) : null;
}
