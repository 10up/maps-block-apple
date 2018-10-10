/*global wp,mapkit*/
import appleStore from './data';

const { Component } = wp.element;
const { InspectorControls } = wp.editor; // Import registerBlockType() from wp.blocks
const { PanelBody, PanelRow, TextControl } = wp.components;
const { select } = wp.data;

class AppleMapEdit extends Component {

	constructor( props ) {
		super( props );
		this.handleGeoCode = this.handleGeoCode.bind( this );
		this.geolocate = this.geolocate.bind( this );
		this.stateChanges = this.stateChanges.bind( this );
		this.state = { auth: true };
	}

	componentDidMount() {
		// Init the map instance
		if ( mapkit && typeof mapkit !== 'undefined' ) {
			this.map = new mapkit.Map( document.getElementById( this.props.clientId ) );
			// These items do not have corresponding controls
			this.map.showsMapTypeControl = false;
			this.map.showsCompass = mapkit.FeatureVisibility.Hidden;

			this.geocoder = new mapkit.Geocoder();
			this.props.setAttributes( { mapID: this.props.clientId} );
			// Setup the display.
			this.setMapDisplay();
			this.mapHandlers();
		}
		// Subscribe to the store
		appleStore.subscribe( this.stateChanges );
	}

	stateChanges() {
		const mapState = select( 'apple-maps-for-wordpress' ).getAppleMapsState();
		this.setState( { auth: mapState.auth } );
	}

	setMapDisplay() {
		const { latitude, longitude, latitudeDelta, longitudeDelta } = this.props.attributes;
		if ( latitude && longitude && latitudeDelta && longitudeDelta ) {
			this.map.region = new mapkit.CoordinateRegion(
				new mapkit.Coordinate( latitude, longitude ),
				new mapkit.CoordinateSpan( latitudeDelta, longitudeDelta )
			);
		} else {
			// Set the map display to the initial state.
			this.updateLocationZoomData( this.map.region );
		}
	}

	handleGeoCode( address ) {

		if ( address ) {
			this.geocoder.lookup( address, this.geolocate );
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
		this.map.addEventListener( 'scroll-end', event  => {
			this.updateLocationZoomData( event.target.region );
		} );

		this.map.addEventListener( 'zoom-end', event => {
			this.updateLocationZoomData( event.target.region );
		} );
	}

	/**
	 *
	 * @param regionData
	 */
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
		const { attributes:{ width, height, address, latitude, longitude }, className, setAttributes, clientId } = this.props;
		const style = { width: width + '%', height: height + 'px' };
		const updateAddress = ( address ) => {
			this.handleGeoCode( address );
			setAttributes( {address} );
		};
		return [
			<InspectorControls>
				<PanelBody
					title={'Settings'}
				>
					<PanelRow>
						<TextControl
							label={'Address'}
							value={ address }
							onChange={ address => updateAddress( address ) }
						/>
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
					<PanelRow>
						<TextControl readonly="readonly"
							label={'Latitude'}
							value={ latitude }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl readonly="readonly"
							label={'Longitude'}
							value={ longitude }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				{ ! this.state.auth && ( <div className="editor-warning no-auth">MapKit JS did not authenticate. Please refresh your token in the settings.</div> ) }
				<div id={clientId} style={style}></div>
			</div>
		];
	}
}

export default AppleMapEdit;



