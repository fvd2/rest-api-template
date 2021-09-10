module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			version: '4.0.3',
			skipMD5: true
		},
		instance: {
			port: 35355
		},
		autoStart: false,
		debug: '1'
	}
}
