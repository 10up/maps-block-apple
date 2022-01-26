import { __ } from '@wordpress/i18n';
import {
	Button,
	TextControl,
	PanelBody,
	ColorPalette,
	ColorIndicator,
	PanelRow,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import LocationInfo from './LocationInfo';

export default function EditMarker(props) {
	const { marker, remove, update } = props;
	const availableColors = useSelect((select) => {
		const settings = select('core/block-editor').getSettings();
		return settings.colors;
	});

	return (
		<PanelBody
			title={marker.title}
			className="marker-edit"
			icon={'location'}
			initialOpen={false}
		>
			<TextControl
				label={__('Title', 'maps-block-apple')}
				value={marker.title}
				onChange={(value) => update({ ...marker, title: value })}
			/>
			<TextControl
				label={__('Subtitle', 'maps-block-apple')}
				value={marker.subtitle}
				onChange={(value) => update({ ...marker, subtitle: value })}
			/>
			<PanelRow>
				<label htmlFor="marker-color-control">
					{__('Marker Color', 'maps-block-apple')}
				</label>
				<ColorIndicator
					id="marker-color-control"
					colorValue={marker.color}
				/>
			</PanelRow>
			<ColorPalette
				value={marker.color}
				colors={availableColors}
				onChange={(value) => update({ ...marker, color: value })}
			/>
			<PanelRow>
				<label htmlFor="glyph-color-control">
					{__('Icon Color', 'maps-block-apple')}
				</label>
				<ColorIndicator
					id="glyph-color-control"
					colorValue={marker.glyphColor}
				/>
			</PanelRow>
			<ColorPalette
				value={marker.glyphColor}
				colors={availableColors}
				onChange={(value) => update({ ...marker, glyphColor: value })}
			/>
			<PanelRow>
				<LocationInfo
					latitude={marker.latitude}
					longitude={marker.longitude}
				/>
			</PanelRow>
			<PanelRow>
				<Button isLink icon="no" isDestructive onClick={remove}>
					{__('Remove Marker', 'maps-block-apple')}
				</Button>
			</PanelRow>
		</PanelBody>
	);
}
