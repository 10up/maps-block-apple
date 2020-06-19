import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
// import { AppleMapEdit } from './AppleMap';

export default function EditAuthForm() {
	const [ privateKey, setPrivateKey ] = useState( null );
	const [ keyId, setKeyId ] = useState( null );
	const [ teamId, setTeamId ] = useState( null );
	const [ isBusy, setIsBusy ] = useState( false );

	useEffect( () => {
		Promise.all( [
			apiFetch( {
				path: '/MapsBlockApple/v1/private_key/get/',
			} ),
			apiFetch( {
				path: '/MapsBlockApple/v1/team_id/get/',
			} ),
			apiFetch( {
				path: '/MapsBlockApple/v1/key_id/get/',
			} ),
		] )
			.then( ( [ newPrivateKey, newTeamId, newKeyId ] ) => {
				setPrivateKey( newPrivateKey );
				setTeamId( newTeamId );
				setKeyId( newKeyId );
			} )
			.catch( ( error ) => {
				dispatch( 'core/notices' ).createWarningNotice( error.message, {
					isDismissible: true,
				} );
			} );
	}, [] );

	const handleSave = () => {
		setIsBusy( true );

		Promise.all( [
			apiFetch( {
				path: '/MapsBlockApple/v1/private_key/',
				method: 'POST',
				data: privateKey,
			} ),
			apiFetch( {
				path: '/MapsBlockApple/v1/team_id/',
				method: 'POST',
				data: teamId,
			} ),
			apiFetch( {
				path: '/MapsBlockApple/v1/key_id/',
				method: 'POST',
				data: keyId,
			} ),
		] )
			.then( ( [ newPrivateKey, newTeamId, newKeyId ] ) => {
				setPrivateKey( newPrivateKey );
				setTeamId( newTeamId );
				setKeyId( newKeyId );
				setIsBusy( false );
				mapkit.dispatchEvent( new CustomEvent( 'reinitialize' ) );
			} )
			.catch( ( error ) => {
				dispatch( 'core/notices' ).createErrorNotice( error.message, {
					isDismissible: true,
					type: 'snackbar',
				} );
				setIsBusy( false );
			} );
	};

	return (
		<>
			<TextareaControl
				label={ __(
					'Please enter your Private Key',
					'maps-block-apple'
				) }
				readonly={ isBusy }
				name="private_key"
				value={ privateKey }
				onChange={ ( newPrivateKey ) => setPrivateKey( newPrivateKey ) }
			/>
			<TextControl
				label={ __(
					'Please enter your Key ID',
					'maps-block-apple'
				) }
				readonly={ isBusy }
				name="key_id"
				value={ keyId }
				onChange={ ( newKeyId ) => setKeyId( newKeyId ) }
			/>
			<TextControl
				label={ __(
					'Please enter your Team ID',
					'maps-block-apple'
				) }
				readonly={ isBusy }
				name="team_id"
				value={ teamId }
				onChange={ ( newTeamId ) => setTeamId( newTeamId ) }
			/>
			<Button
				isButton
				isPrimary
				disabled={ isBusy }
				isBusy={ isBusy }
				onClick={ handleSave }
			>
				{ __( 'Confirm MapKit Credentials', 'maps-block-apple' ) }
			</Button>
		</>
	);
}
