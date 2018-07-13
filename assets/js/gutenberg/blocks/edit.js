/*global wp,mapkit*/
import appleStore from './data';

const { Component, createRef } = wp.element;
const { InspectorControls } = wp.editor; // Import registerBlockType() from wp.blocks
const { PanelBody, PanelRow, TextControl, Button } = wp.components;
const { select } = wp.data;

class AppleMapEdit extends Component {

	constructor( props ) {
		super( props );
		this.handleGeoCode = this.handleGeoCode.bind( this );
		this.geolocate = this.geolocate.bind( this );
		this.stateChanges = this.stateChanges.bind( this );
		this.auth = true;
	}

	componentDidMount() {
		// Init the map instance
		appleStore.subscribe( this.stateChanges );
	}

	stateChanges() {
		const mapState = select( 'apple-maps-for-wordpress' ).getAppleMapsState();
		this.auth = mapState.auth;
		if ( mapState.ready === true ) {
			this.ready = true;
			if ( mapkit && typeof mapkit !== 'undefined' ) {
				this.map = new mapkit.Map( document.getElementById( this.props.id ) );
				// These items do not have corresponding controls
				this.map.showsMapTypeControl = false;
				this.map.showsCompass = mapkit.FeatureVisibility.Hidden;

				this.geocoder = new mapkit.Geocoder();
				this.props.setAttributes( { mapID: this.props.id } );
				this.addressFieldRef = createRef();
				// Setup the display.
				this.setMapDisplay();
				this.mapHandlers();
			}
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
		const style = { width: width + '%', height: height + 'px' };
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
							label={'Width ( % )'}
							value={width}
							onChange={ width => setAttributes( { width } ) }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'Height ( pixels )'}
							value={ height }
							onChange={ height => setAttributes( { height } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				{ ! this.auth && ( <div className="editor-warning">MapKit JS did not authenticate. Please refresh your token in the settings.</div> ) }
				<div id={id} style={style}></div>
			</div>
		];
	}
}

export default AppleMapEdit;



