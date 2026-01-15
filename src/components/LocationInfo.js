import { __, sprintf } from '@wordpress/i18n';

export default function LocationInfo({ latitude, longitude }) {
	return (
		<>
			<p>
				{sprintf(
					/* translators: 1: Latitude, 2: Longitude */
					__('Coordinates: %1$s, %2$s', 'maps-block-apple'),
					latitude.toFixed(4),
					longitude.toFixed(4)
				)}
			</p>
		</>
	);
}
