module.exports = userSchema = {
	required: ['email', 'password'],
	properties: {
		name: {
			bsonType: 'string',
			description: 'must be in e-mail format (*@*.*)',
		},
		password: {
			bsonType: 'string',
			description: 'hexadecimal SHA256 hash of user password'
		},
        scopes: {
            bsonType: 'array',
            description: 'array of strings denoting endpoints and access rights, e.g. Products: R, Order: CRUD'
        }
	},
}
