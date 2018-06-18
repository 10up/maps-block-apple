require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');


const payload = {
		iss: process.env.AUTH_ISS,
		iat: Date.now() / 1000,
		exp: ( Date.now() / 1000 ) + 15778800,
		origin: 'http://gutenberg.local'
	};

const headers = {
	alg: "ES256",
	kid: process.env.AUTH_KID,
	typ: "JWT"

};

fs.readFile( process.env.AUTH_KEY, function( err, data ){
	const token = jwt.sign( payload, data, { header:headers } );
	console.log( '==== START AUTH TOKEN ====\n' );
	console.log( token );
	console.log( '\n==== END AUTH TOKEN ====' );
});
