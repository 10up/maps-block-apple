export default function MapsBlockAppleSave( props ) {
	const {
		className,
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

	return (
		<div
			className={ className }
			data-map-type={ mapType }
			data-latitude={ latitude }
			data-longitude={ longitude }
			data-rotation={ rotation }
			data-zoom={ zoom }
			data-shows-map-type-control={ showsMapTypeControl }
			data-is-rotation-enabled={ isRotationEnabled }
			data-shows-compass={ showsCompass }
			data-is-zoom-enabled={ isZoomEnabled }
			data-shows-zoom-control={ showsZoomControl }
			data-is-scroll-enabled={ isScrollEnabled }
			data-shows-scale={ showsScale }
			style={ { height: `${ height }px` } }
		>
			{ markers.map( ( marker, index ) => (
				<div
					key={ index }
					className={ 'marker-annotation' }
					data-latitude={ marker.latitude }
					data-longitude={ marker.longitude }
					data-title={ marker.title }
				/>
			) ) }
		</div>
	);
}
