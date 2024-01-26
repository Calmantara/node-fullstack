const SuccessMessage = {
    "USER_CREATED": "user data successfully created",
    "USER_FETCHED": "user data successfully fetched",
    "USER_UPDATED": "user data succesfully updated",
    "USER_LOGGED_IN": "user successfully logged in"
}

const ErrorMessage = {

    "ERROR_USER_CREATION": "error creating user, please try again",
    "ERROR_USER_UPDATE": "error updating user, please try again",
    "ERROR_USER_FETCH": "error fetching user data, please try again",
    "ERROR_USER_NOT_FOUND": "error user not found in system",
    "ERROR_USER_LOGIN": "something went wrong with user",

    "ERROR_INVALID_USERNAME": "invalid username",
    "ERROR_INVALID_DOB": "invalid dob",
    "ERROR_INVALID_USER_ID": "invalid user id",
    "ERROR_INVALID_PASSWORD": "invalid user password"
}

class SuccessResponse {
    constructor(message, data) {
        this.message = message
        this.data = data
    }
}

class ErrorResponse {
    constructor(error, message) {
        this.error = error
        this.message = message
    }
}

module.exports = { SuccessResponse, ErrorResponse, SuccessMessage, ErrorMessage }