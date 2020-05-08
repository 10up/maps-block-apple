export default function AppleMapsWordPressSave( props ) {
	const {
		className,
		attributes: { mapType, height, latitude, longitude, rotation, zoom },
	} = props;

	return (
		<div
			className={ className }
			data-map-type={ mapType }
			data-latitude={ latitude }
			data-longitude={ longitude }
			data-rotation={ rotation }
			data-zoom={ zoom }
			height={ `${ height }px` }
		/>
	);
}
