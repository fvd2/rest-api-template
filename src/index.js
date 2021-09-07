require("dotenv").config()
const { MongoClient } = require('mongodb')
const app = require('./server')
const usersDAO = require('./dao/usersDAO')

const PORT = process.env.PORT || 5000

MongoClient.connect(process.env.MONGO_URI, {
	poolSize: 100,
    retryWrites: true,
	writeConcern: {
		w: 'majority',
		wtimeout: 2500,
	},
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.error(err)
    process.exit(1)
}).then(async client => {
    await usersDAO.injectDB(client)
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})


