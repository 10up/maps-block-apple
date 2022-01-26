/* eslint-disable camelcase */
import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';

export default function EditAuthForm() {
	const [privateKey, setPrivateKey] = useState('');
	const [keyId, setKeyId] = useState('');
	const [teamId, setTeamId] = useState('');
	const [isBusy, setIsBusy] = useState(false);

	const siteSettings = useSelect((select) => {
		return select('core').getEntityRecord('root', 'site');
	}, []);

	useEffect(() => {
		if (siteSettings) {
			const {
				maps_block_apple: { private_key, team_id, key_id },
			} = siteSettings;
			setPrivateKey(private_key);
			setKeyId(key_id);
			setTeamId(team_id);
		}
	}, [siteSettings]);

	const handleSave = () => {
		setIsBusy(true);

		dispatch('core')
			.saveEntityRecord('root', 'site', {
				maps_block_apple: {
					private_key: privateKey,
					team_id: teamId,
					key_id: keyId,
				},
			})
			.then(({ maps_block_apple: { private_key, team_id, key_id } }) => {
				setPrivateKey(private_key);
				setKeyId(key_id);
				setTeamId(team_id);
				setIsBusy(false);
				mapkit.dispatchEvent(new CustomEvent('reinitialize'));
			})
			.catch((error) => {
				dispatch('core/notices').createErrorNotice(error.message, {
					isDismissible: true,
					type: 'snackbar',
				});
				setIsBusy(false);
			});
	};

	return (
		<>
			<TextareaControl
				label={__('Please enter your Private Key', 'maps-block-apple')}
				readOnly={isBusy}
				name="private_key"
				value={privateKey}
				onChange={(newPrivateKey) => setPrivateKey(newPrivateKey)}
			/>
			<TextControl
				label={__('Please enter your Key ID', 'maps-block-apple')}
				readOnly={isBusy}
				name="key_id"
				value={keyId}
				onChange={(newKeyId) => setKeyId(newKeyId)}
			/>
			<TextControl
				label={__('Please enter your Team ID', 'maps-block-apple')}
				readOnly={isBusy}
				name="team_id"
				value={teamId}
				onChange={(newTeamId) => setTeamId(newTeamId)}
			/>
			<Button
				isPrimary
				disabled={isBusy}
				isBusy={isBusy}
				onClick={handleSave}
			>
				{__('Confirm MapKit Credentials', 'maps-block-apple')}
			</Button>
		</>
	);
}
