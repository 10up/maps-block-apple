/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	MAP_TYPE_OPTIONS,
	FEATURE_VISIBILITY_OPTIONS,
} from '../components/AppleMap';

export default function DisplaySettings(props) {
	const {
		attributes: {
			mapType,
			height,
			zoom,
			showsMapTypeControl,
			isRotationEnabled,
			showsCompass,
			isZoomEnabled,
			showsZoomControl,
			isScrollEnabled,
			showsScale,
		},
		setAttributes,
	} = props;

	return (
		<PanelBody title={__('Display Settings', 'maps-block-apple')}>
			<ToggleGroupControl
				label={__('Map Type', 'maps-block-apple')}
				isBlock={true}
				isAdaptiveWidth
				value={mapType}
				onChange={(value) => setAttributes({ mapType: value })}
			>
				{MAP_TYPE_OPTIONS.map((option) => (
					<ToggleGroupControlOption {...option} key={option.value} />
				))}
			</ToggleGroupControl>
			<ToggleControl
				label={__('Show Map Type Control', 'maps-block-apple')}
				checked={showsMapTypeControl}
				onChange={(value) =>
					setAttributes({ showsMapTypeControl: value })
				}
			/>
			<RangeControl
				label={__('Zoom', 'maps-block-apple')}
				value={zoom}
				onChange={(value) => setAttributes({ zoom: value })}
				min={0}
				max={20}
				step={0.5}
			/>
			<ToggleControl
				label={__('Zoom Enabled', 'maps-block-apple')}
				checked={isZoomEnabled}
				onChange={(value) => setAttributes({ isZoomEnabled: value })}
			/>
			{isZoomEnabled && (
				<ToggleControl
					label={__('Show Zoom Control', 'maps-block-apple')}
					checked={showsZoomControl}
					onChange={(value) =>
						setAttributes({ showsZoomControl: value })
					}
				/>
			)}
			<ToggleControl
				label={__('Rotation Enabled', 'maps-block-apple')}
				checked={isRotationEnabled}
				onChange={(value) =>
					setAttributes({ isRotationEnabled: value })
				}
			/>
			{isRotationEnabled && (
				<ToggleGroupControl
					label={__('Compass Visibility', 'maps-block-apple')}
					isBlock={true}
					value={showsCompass}
					onChange={(value) => setAttributes({ showsCompass: value })}
				>
					{FEATURE_VISIBILITY_OPTIONS.map((option) => (
						<ToggleGroupControlOption
							{...option}
							key={option.value}
						/>
					))}
				</ToggleGroupControl>
			)}
			<ToggleControl
				label={__('Scroll Enabled', 'maps-block-apple')}
				checked={isScrollEnabled}
				onChange={(value) => setAttributes({ isScrollEnabled: value })}
			/>
			<ToggleGroupControl
				label={__('Scale Visibility', 'maps-block-apple')}
				value={showsScale}
				isBlock={true}
				onChange={(value) => setAttributes({ showsScale: value })}
			>
				{FEATURE_VISIBILITY_OPTIONS.map((option) => (
					<ToggleGroupControlOption {...option} key={option.value} />
				))}
			</ToggleGroupControl>
			<TextControl
				label={__('Height ( pixels )', 'maps-block-apple')}
				value={height}
				onChange={(value) => setAttributes({ height: value })}
			/>
		</PanelBody>
	);
}
