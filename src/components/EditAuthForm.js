/* eslint-disable camelcase */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	TextareaControl,
	Button,
	Flex,
	FlexItem,
	Gu
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { SVG, Circle } from '@wordpress/primitives';

const STEPS = {
	GET_STARTED: 0,
	CREATE_APPLE_DEV_ACCOUNT: 1,
	CONFIRM_CREDS: 2,
}

const PageControlIcon = () => (
	<SVG width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<Circle cx="4" cy="4" r="4" />
	</SVG>
);

export default function EditAuthForm() {
	const [privateKey, setPrivateKey] = useState('');
	const [keyId, setKeyId] = useState('');
	const [teamId, setTeamId] = useState('');
	const [isBusy, setIsBusy] = useState(false);
	const [step, setStep] = useState( STEPS.GET_STARTED );

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

	function getNavData() {
		switch ( step ) {
			case STEPS.GET_STARTED:
				return {
					text: __( 'Get started!', 'maps-block-apple' ),
					step: STEPS.CREATE_APPLE_DEV_ACCOUNT,
					isEnabled: true,
				}

			case STEPS.CREATE_APPLE_DEV_ACCOUNT:
				return {
					text: __( 'Next', 'maps-block-apple' ),
					step: STEPS.CONFIRM_CREDS,
					isEnabled: keyId && teamId,
				}

			case STEPS.CONFIRM_CREDS:
				return {
					text: __( 'Next', 'maps-block-apple' ),
					step: STEPS.CONFIRM_CREDS,
					isEnabled: privateKey,
				}
		}
	}

	const navData = getNavData();

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

	const pageControl = [];

	for ( let i = 0; i < Object.keys( STEPS ).length; i++ ) {
		const disableButton = ! navData.isEnabled && i > step;
		pageControl.push(
			<li
				key={ i }
				// Set aria-current="step" on the active page, see https://www.w3.org/TR/wai-aria-1.1/#aria-current
				aria-current={ i === step ? 'step' : undefined }
			>
				<Button
					key={ i }
					icon={ <PageControlIcon /> }
					aria-label={ sprintf(
						/* translators: 1: current page number 2: total number of pages */
						__( 'Page %1$d of %2$d' ),
						i + 1,
						Object.keys( STEPS ).length
					) }
					onClick={ () => setStep( i ) }
					disabled={ disableButton }
				/>
			</li>
		);
	}

	const initPage = (
		<>
			<h2>{ __( 'Welcome to Block for Apple Maps.', 'maps-block-apple' ) }</h2>
			<p>{ __( 'In order to include an Apple Map on your website, you need to confirm your MapKit credentials.', 'maps-block-apple' ) }</p>
		</>
	);

	const signupAppleDevAccountPage = (
		<>
			<h4>{ __( 'Create an Apple Developer account.', 'maps-block-apple' ) }</h4>
			<ol style={ { marginBottom: '2rem' } }>
				<li>
					<a href="https://developer.apple.com/programs/enroll/">{ __( 'Enroll in the Apple Developer Program as either an individual or organization.', 'maps-block-apple' ) }</a>
				</li>
				<li>
					{ __( 'Sign the Apple Developer Program License Agreement in the ', 'maps-block-apple' ) }
					<a href="https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/da/jumpTo?page=contracts">{ __( 'Agreements, Tax, and Banking section of App Store Connect.', 'maps-block-apple' ) }</a>
				</li>
				<li dangerouslySetInnerHTML={ { __html: __( 'Open the Key you created above, copy the <code>Key ID</code> value, and paste it into the respective field below.', 'maps-block-apple' ) } } />
				<li dangerouslySetInnerHTML={ { __html: __( 'Open the Identifier you created above, copy the <code>App ID Prefix</code> value (notice the value is appended with <code>(Team ID)</code>), and paste it into the respective field below.', 'maps-block-apple' ) } } />
			</ol>
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
		</>
	);

	const createCredentials = (
		<>
			<h4>{ __( 'Create a Maps Identifier and Private Key.', 'maps-block-apple' ) }</h4>
			<ol style={ { marginBottom: '2rem' } }>
				<li>
					<a href="https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key">
						{ __( 'Create a Maps ID and a MapKit JS Private Key.', 'maps-block-apple' ) }
					</a>
				</li>
				<li dangerouslySetInnerHTML={ { __html:  __( 'Copy the Private Key, paste it into the respective field below, and ensure the key includes the <code>-----BEGIN PRIVATE KEY-----</code> and <code>-----END PRIVATE KEY-----</code> lines.' ) } } />
			</ol>
			<TextareaControl
				label={__('Please enter your Private Key', 'maps-block-apple')}
				readOnly={isBusy}
				name="private_key"
				value={privateKey}
				onChange={(newPrivateKey) => setPrivateKey(newPrivateKey)}
			/>
			<Flex justify='flex-end'>
				<Button
					isPrimary
					disabled={isBusy || !navData.isEnabled}
					isBusy={isBusy}
					onClick={handleSave}
					style={ { marginTop: '3rem' } }
				>
					{__('Confirm MapKit Credentials', 'maps-block-apple')}
				</Button>
			</Flex>
		</>
	);

	return (
		<div className='maps-block-apple__setup-wrapper'>
			<ul className="components-guide__page-control" aria-label={ __( 'Guide controls' ) } style={{ padding: 0 }}>
				{ pageControl }
			</ul>
			{ step === STEPS.GET_STARTED && initPage }
			{ step === STEPS.CREATE_APPLE_DEV_ACCOUNT && signupAppleDevAccountPage }
			{ step === STEPS.CONFIRM_CREDS && createCredentials }

			{ step !== STEPS.CONFIRM_CREDS && ( <div style={ { marginTop: '3rem' } }>
				<Flex justify="flex-end">
					<FlexItem>
						<Button
							variant='primary'
							text={ navData.text }
							onClick={ () => setStep( navData.step ) }
							disabled={ ! navData.isEnabled }
						/>
					</FlexItem>
				</Flex>
			</div> ) }
		</div>
	)
}
