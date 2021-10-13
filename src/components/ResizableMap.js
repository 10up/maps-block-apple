import { ResizableBox } from '@wordpress/components';
import { useState } from '@wordpress/element';

const RESIZABLE_BOX_ENABLE_OPTION = {
	top: false,
	right: false,
	bottom: true,
	left: false,
	topRight: false,
	bottomRight: false,
	bottomLeft: false,
	topLeft: false,
};

const MAP_MIN_HEIGHT = 100;

export function ResizableMap( {
	onResizeStart,
	onResize,
	onResizeStop,
	...props
} ) {
	const [ isResizing, setIsResizing ] = useState( false );

	return (
		<ResizableBox
			style={ {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			} }
			className={ `apple-maps-block__resize-container ${
				isResizing ? 'is-resizing' : ''
			}` }
			enable={ RESIZABLE_BOX_ENABLE_OPTION }
			onResizeStart={ ( _event, _direction, elt ) => {
				onResizeStart( elt.clientHeight );
				onResize( elt.clientHeight );
			} }
			onResize={ ( _event, _direction, elt ) => {
				onResize( elt.clientHeight );
				if ( ! isResizing ) {
					setIsResizing( true );
				}
			} }
			onResizeStop={ ( _event, _direction, elt ) => {
				onResizeStop( elt.clientHeight );
				setIsResizing( false );
			} }
			minHeight={ MAP_MIN_HEIGHT }
			{ ...props }
		/>
	);
}
