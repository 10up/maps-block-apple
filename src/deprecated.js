/**
 * External dependencies
 */
const { Map, FeatureVisibility } = mapkit;

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '../block.json';

export default [
	{
		attributes: {
			...metadata.attributes,
			mapType: {
				type: 'string',
				default: Map.MapTypes.Standard,
			},
			showsCompass: {
				type: 'string',
				default: FeatureVisibility.Adaptive,
			},
			showsScale: {
				type: 'string',
				default: FeatureVisibility.Adaptive,
			},
		},
		save(props) {
			const {
				attributes: {
					mapType,
					height,
					latitude,
					longitude,
					rotation,
					zoom,
					showsMapTypeControl,
					isRotationEnabled,
					showsCompass,
					isZoomEnabled,
					showsZoomControl,
					isScrollEnabled,
					showsScale,
					markers,
				},
			} = props;

			const blockProps = useBlockProps.save();

			return (
				<div
					{...blockProps}
					data-map-type={mapType}
					data-latitude={latitude}
					data-longitude={longitude}
					data-rotation={rotation}
					data-zoom={zoom}
					data-shows-map-type-control={showsMapTypeControl}
					data-is-rotation-enabled={isRotationEnabled}
					data-shows-compass={showsCompass}
					data-is-zoom-enabled={isZoomEnabled}
					data-shows-zoom-control={showsZoomControl}
					data-is-scroll-enabled={isScrollEnabled}
					data-shows-scale={showsScale}
					style={{ height: `${height}px` }}
				>
					{markers.map((marker, index) => (
						<div
							key={index}
							className={'marker-annotation'}
							data-latitude={marker.latitude}
							data-longitude={marker.longitude}
							data-title={marker.title}
							data-subtitle={marker.subtitle}
							data-color={marker.color}
							data-glyph-color={marker.glyphColor}
						/>
					))}
				</div>
			);
		},
	},
];
