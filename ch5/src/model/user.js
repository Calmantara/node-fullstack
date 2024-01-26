const { Model } = require("sequelize")
const { ErrorMessage } = require("./response")

class User extends Model { }

class UserRequest {
    constructor(username, password, dob) {
        this.username = username
        this.password = password
        this.dob = dob
    }

    validate() {
        this.validateUsername()
        this.validateDOB()
        this.validatePassword()
    }

    validateUsername() {
        if (!this.username) {
            throw new Error(ErrorMessage.ERROR_INVALID_USERNAME)
        }
    }

    validatePassword() {
        if (!this.password) {
            throw new Error(ErrorMessage.ERROR_INVALID_PASSWORD)
        }

        // add some validation
        // password min 8 char
        // harus ada special char
        // harus ada capital
        // etc
    }

    validateDOB() {
        if (!this.dob) {
            throw new Error(ErrorMessage.ERROR_INVALID_DOB)
        }
    }
}

module.exports = { User, UserRequest }