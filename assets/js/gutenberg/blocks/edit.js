/*global wp,mapkit*/
/*eslint-disable no-unused-vars*/
const { Component, createRef } = wp.element;
const { InspectorControls } = wp.editor; // Import registerBlockType() from wp.blocks
const { PanelBody, PanelRow, TextControl, Button } = wp.components;

class AppleMapEdit extends Component {

	constructor( props ) {
		super( props );
		this.handleGeoCode = this.handleGeoCode.bind( this );
		this.geolocate = this.geolocate.bind( this );
	}

	componentDidMount() {
		// Init the map instance
		if ( mapkit && typeof mapkit !== 'undefined' ) {
			this.map = new mapkit.Map( document.getElementById( this.props.id ) );
			// These items do not have corresponding controls
			this.map.showsMapTypeControl = false;
			this.map.showsCompass = mapkit.FeatureVisibility.Hidden;

			this.geocoder = new mapkit.Geocoder();
			this.props.setAttributes( {mapID: this.props.id} );
			this.addressFieldRef = createRef();
			// Setup the display.
			this.setMapDisplay();
			this.mapHandlers();
		}
	}

	setMapDisplay() {
		const { latitude, longitude, latitudeDelta, longitudeDelta } = this.props.attributes;
		if ( latitude && longitude && latitudeDelta && longitudeDelta ) {
			this.map.region = new mapkit.CoordinateRegion(
				new mapkit.Coordinate( latitude, longitude ),
				new mapkit.CoordinateSpan( latitudeDelta, longitudeDelta )
			);
		}
	}

	handleGeoCode() {
		const field = this.addressFieldRef.current;
		if ( field.value ) {
			this.geocoder.lookup( field.value, this.geolocate );
		}
	}

	geolocate( error, data ) {
		if ( data.results ) {
			const location = data.results[0].region;
			this.map.region = new mapkit.CoordinateRegion(
				new mapkit.Coordinate( location.center.latitude, location.center.longitude ),
				new mapkit.CoordinateSpan( location.span.latitudeDelta, location.span.longitudeDelta )
			);
			// Update the block.
			this.updateLocationZoomData( location );
		}
	}


	mapHandlers() {
		this.map.addEventListener( 'scroll-end', ( event ) => {
			this.updateLocationZoomData( event.target.region );
		} );

		this.map.addEventListener( 'zoom-end', ( event ) => {
			this.updateLocationZoomData( event.target.region );
		} );
	}

	updateLocationZoomData( regionData ) {
		const centerData = regionData.center;
		const spanData = regionData.span;
		this.props.setAttributes( {
			latitude: centerData.latitude,
			longitude: centerData.longitude,
			latitudeDelta: spanData.latitudeDelta,
			longitudeDelta: spanData.longitudeDelta
		} );
	}

	render () {
		const { attributes:{ width, height, address }, className, setAttributes, id } = this.props;
		const style = { width, height };
		return [
			<InspectorControls>
				<PanelBody
					title={'Settings'}
				>
					<PanelRow>
						<label>Address
							<input type="text" ref={this.addressFieldRef} value={address} />
							<Button
								onClick={this.handleGeoCode}
								className="button"
							>Lookup
							</Button>
						</label>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'Width'}
							value={width}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'Height'}
							value={ height }
							onChange={ height => setAttributes( { height } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ className }>
				<div id={id} style={style}></div>
			</div>
		];
	}
}

export default AppleMapEdit;



