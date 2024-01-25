const { Model } = require("sequelize")
const { ErrorMessage } = require("./response")

class User extends Model { }

class UserRequest {
    constructor(username, dob) {
        this.username = username
        this.dob = dob
    }

    validate() {
        this.validateUsername()
        this.validateDOB()
    }

    validateUsername() {
        if (!this.username) {
            throw new Error(ErrorMessage.ERROR_INVALID_USERNAME)
        }
    }

    validateDOB() {
        if (!this.dob) {
            throw new Error(ErrorMessage.ERROR_INVALID_DOB)
        }
    }
}

module.exports = { User, UserRequest }