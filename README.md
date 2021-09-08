# rest-api-template
A template for a RESTful API that manages user authentication and can be easily extended with functionality to serve as a back-end for web applications  

# Functionality
## Authentication
* Users can register using an e-mail and password 
* Users can login, upon which they receive an AccessToken (via response body - valid for 15 minutes) and RefreshToken (via cookie - valid for 12 hours)
* Users can refresh their AccessToken, if their RefreshToken has not yet expired
* Users can logout, upon which their session ends and the associated RefreshToken is removed

## Account management
* Users can delete their account
* Users can update their account information (currently only their e-mail address and password)

# Even better if: ideas for additions and further improvements
* token-based email confirmation after registering and changing e=mail address
