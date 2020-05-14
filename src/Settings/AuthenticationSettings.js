import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import EditAuthForm from '../components/EditAuthForm';

export default function AuthenticationSettings() {
	return (
		<PanelBody
			title={ __( 'Authentication', 'apple-maps-wordpress' ) }
			initialOpen={ false }
		>
			<EditAuthForm />
		</PanelBody>
	);
}
