/*global AMFWP_ADMIN*/
import jwt from 'jsonwebtoken';

const generateTokenButton = document.getElementById( 'generate-token' );
const tokenStorage = document.getElementById( 'long-life-token' );
const tokenGenAuthKey = document.getElementById( 'token-gen-authkey' );
const tokenGenISS = document.getElementById( 'token-gen-iss' );
const tokenGenKID = document.getElementById( 'token-gen-kid' );

const showMapKitButton = document.getElementById( 'toggle-auth-key' );
const authKeyContainer = document.getElementById( 'authkey-container' );

const showTokenButton = document.getElementById( 'toggle-long-life-token' );
const tokenContainer = document.getElementById( 'long-life-token-container' );

/**
 * Generate the token.
 */
generateTokenButton.addEventListener( 'click', e => {
	e.preventDefault();
	if ( tokenGenAuthKey.value && tokenGenISS.value && tokenGenKID.value ) {
		const payload = {
			iss: tokenGenISS.value,
			iat: Date.now() / 1000,
			exp: ( Date.now() / 1000 ) + 15778800,
			origin: AMFWP_ADMIN.origin
		};

		const headers = {
			alg: 'ES256',
			kid: tokenGenKID.value,
			typ: 'JWT'

		};

		const token = jwt.sign( payload, tokenGenAuthKey.value, {header: headers} );
		if ( token ) {
			if ( tokenContainer.classList.contains( 'hidden' ) ) {
				showTokenButton.click();
			}

			tokenStorage.value = token;
		}
	}
} );


/**
 * Helper to show/hide the text areas and update the button text
 */
const toggleTextArea = ( button, textArea ) => {
	const dataAttr = button.getAttribute( 'data-text-index' );
	const state = ( ! textArea.classList.contains( 'hidden' ) ) ? 'show' + dataAttr : 'hide' + dataAttr;
	textArea.classList.toggle( 'hidden' );
	button.innerText = AMFWP_ADMIN.buttonTexts[ state ];
};

/**
 * Show/hide the MapKit JS Key
 */
showMapKitButton.addEventListener( 'click', e => {
	e.preventDefault();
	toggleTextArea( e.target, authKeyContainer );
} );

showTokenButton.addEventListener( 'click', e => {
	e.preventDefault();
	toggleTextArea( e.target, tokenContainer );
} );
