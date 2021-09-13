# rest-api-template
RESTful API for managing user authentication and account management using Node.js, Express and MongoDB. It can easily be extended to serve as a back-end for web applications. It includes a testing setup based on [Jest-MongoDB ('Jest preset to run MongoDB memory server')](https://github.com/shelfio/jest-mongodb). The structure is partly inspired by the mflix API from MongoDB's 'MongoDB for JavaScript Developers' course (M220JS), which I recently completed. 

## Usage
1. Clone repo and install dependencies
2. Add custom values in local.env file
3. Rename local.env to .env

## Functionality
### Authentication
* Users can register using an e-mail and password 
* Users can login, upon which they receive an AccessToken (via response body - valid for 15 minutes) and RefreshToken (via cookie - valid for 12 hours)
* Users can refresh their AccessToken, if their RefreshToken has not yet expired
* Users can logout, upon which their session ends and the associated RefreshToken is removed

### Account management
* Users can delete their account
* Users can update their account information (currently only their e-mail address and password)

## Even better if: ideas for additions and further improvements
* token-based email confirmation after registering and updating e-mail address
