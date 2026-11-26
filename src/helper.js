import { useSelect } from '@wordpress/data';

export default function IsAdmin( { children, fallback } ) {
	const canCreateUsers = useSelect( ( select ) =>
		select( 'core' ).canUser( 'update', 'settings' )
	);

	if ( canCreateUsers ) {
		return children;
	}

	if ( fallback ) {
		return fallback;
	}

	return null;
}
