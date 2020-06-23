import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import AuthenticationSettings from './Settings/AuthenticationSettings';
import DisplaySettings from './Settings/DisplaySettings';
import LocationSettings from './Settings/LocationSettings';
import MarkerSettings from './Settings/MarkerSettings';

export default function InspectorSettings( props ) {
	const { authenticated, map } = props;

	if ( ! authenticated ) {
		return (
			<InspectorControls>
				<PanelBody>
					<p>
						{ __(
							'You need to confirm your access to Apple Maps before you can continue.',
							'maps-block-apple'
						) }
					</p>
				</PanelBody>
			</InspectorControls>
		);
	}

	return (
		<InspectorControls>
			<LocationSettings { ...props } map={ map } />
			<DisplaySettings { ...props } />
			<MarkerSettings { ...props } />
			<AuthenticationSettings />
		</InspectorControls>
	);
}
