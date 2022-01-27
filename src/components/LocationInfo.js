import { __ } from '@wordpress/i18n';

export default function LocationInfo({ latitude, longitude }) {
	return (
		<>
			<p>
				{__('Coordinates: ', 'maps-block-apple')}
				{`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
			</p>
		</>
	);
}
