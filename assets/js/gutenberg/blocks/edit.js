/*global wp,mapkit*/
/*eslint-disable no-unused-vars*/
const { Component } = wp.element;
const { BlockControls, BlockAlignmentToolbar, InspectorControls } = wp.editor; // Import registerBlockType() from wp.blocks
const { PanelBody, PanelRow, TextControl } = wp.components;

class AppleMapEdit extends Component {

	componentDidMount() {
		// Init the map instance
		this.map = new mapkit.Map( document.getElementById( this.props.id ) );
		this.props.setAttributes( { mapID: this.props.id } );
		// Setup the display.
		this.setMapDisplay();
		this.mapHandlers();
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
		const { attributes:{ width, height, latitude, longitude, latitudeDelta, longitudeDelta },blockAlignment, className, setAttributes, id } = this.props;
		const style = { width, height };
		return [
			<InspectorControls>
				<PanelBody
					title={'Settings'}
				>
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
					<PanelRow>
						<TextControl
							label={'Lat'}
							value={ latitude }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'Long'}
							value={ longitude }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'LongDelta'}
							value={ latitudeDelta }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={'LatDelta'}
							value={ longitudeDelta }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<BlockControls>
				<BlockAlignmentToolbar
					value={ blockAlignment }
					onChange={ blockAlignment => setAttributes( {blockAlignment} ) }
				/>
			</BlockControls>,
			<div className={ className }>
				<div id={id} style={style}></div>
			</div>
		];
	}
}

export default AppleMapEdit;



