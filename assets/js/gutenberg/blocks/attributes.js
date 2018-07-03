const attributes = {
	blockAlignment: {
		type: 'string',
		default : 'full'
	},
	width: {
		type: 'string',
		default: '100%',
	},
	height: {
		type: 'string',
		default: '600px',
	},

	latitude: {
		type: 'number'
	},

	longitude: {
		type: 'number'
	},

	latitudeDelta: {
		type: 'number'
	},

	longitudeDelta: {
		type: 'number'
	},
	mapID : {
		type: 'string',
	},
	address: {
		type: 'string',
	}
};

export default attributes;
