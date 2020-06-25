export default function LocationInfo( { latitude, longitude } ) {
	return (
		<>
			<p className="components-form-token-field__help">{ `${ latitude.toFixed(
				6
			) }, ${ longitude.toFixed( 6 ) }` }</p>
		</>
	);
}
