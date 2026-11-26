import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import EditAuthForm from '../components/EditAuthForm';
import IsAdmin from '../helper';

export default function AuthenticationSettings() {
	return (
		<IsAdmin>
			<PanelBody
				title={ __( 'Authentication', 'maps-block-apple' ) }
				initialOpen={ false }
			>
				<EditAuthForm />
			</PanelBody>
		</IsAdmin>
	);
}
