/*global AMFWP*/
/*eslint-disable no-unused-vars*/
import jwt from 'jsonwebtoken';


const generateTokenButton = document.getElementById( 'generate-token' );
const tokenStorage = document.getElementById( 'long-life-token' );
const tokenGenAuthKey = document.getElementById( 'token-gen-authkey' ).value;
const tokenGenISS = document.getElementById( 'token-gen-iss' ).value;
const tokenGenKID = document.getElementById( 'token-gen-kid' ).value;

generateTokenButton.addEventListener( 'click', ev => {

	ev.preventDefault();
	if ( tokenGenAuthKey && tokenGenISS && tokenGenKID ) {
		const payload = {
			iss: tokenGenISS,
			iat: Date.now() / 1000,
			exp: ( Date.now() / 1000 ) + 15778800,
			origin: AMFWP.origin
		};

		const headers = {
			alg: 'ES256',
			kid: tokenGenKID,
			typ: 'JWT'

		};
		const token = jwt.sign( payload, tokenGenAuthKey, {header: headers} );
		if ( token ) {
			tokenStorage.value = token;
		}
	}
} );



