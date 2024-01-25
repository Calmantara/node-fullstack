const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");
const { UserRequest } = require("../model/user");

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async createUser(req, res) {
        let payload = req.body
        payload = Object.assign(new UserRequest, payload)

        // validate payload
        try {
            payload.validate()
        } catch (error) {
            console.error(`error validating payload ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_CREATION)]
            res.status(400).send(errs)
        }

        // call repository
        try {
            await this.userService.createUser(payload)
            const response = new SuccessResponse(SuccessMessage.USER_CREATED)
            res.status(201).send(response)
        } catch (error) {
            console.error(`error creating user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_CREATION)]
            res.status(500).send(errs)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await this.userService.getUsers()
            const response = new SuccessResponse(SuccessMessage.USER_FETCHED, users)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_FETCH)]
            res.status(500).send(errs)
        }
    }

    async getUserById(req, res) {
        const userId = req.params.userId
        if (userId <= 0) {
            const errs = [new ErrorResponse(ErrorMessage.ERROR_INVALID_USER_ID, ErrorMessage.ERROR_USER_FETCH)]
            res.status(400).send(errs)
            return
        }

        try {
            const user = await this.userService.getUserById(userId)
            if (!user) {
                const errs = [new ErrorResponse(ErrorMessage.ERROR_USER_NOT_FOUND, ErrorMessage.ERROR_USER_FETCH)]
                res.status(404).send(errs)
                return
            }
            const response = new SuccessResponse(SuccessMessage.USER_FETCHED, user)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_FETCH)]
            res.status(500).send(errs)
        }
    }

    async updateUserDob(req, res) {
        const userId = req.params.userId
        if (userId <= 0) {
            const errs = [new ErrorResponse(ErrorMessage.ERROR_INVALID_USER_ID, ErrorMessage.ERROR_USER_FETCH)]
            res.status(400).send(errs)
            return
        }

        const user = Object.assign(new UserRequest, req.body)
        try {
            user.validateDOB()
        } catch (error) {
            console.error(`error validating payload ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_UPDATE)]
            res.status(400).send(errs)
        }
        user.id = userId

        try {
            await this.userService.updateUserDob(user)
            const response = new SuccessResponse(SuccessMessage.USER_UPDATED)
            res.status(200).send(response)
        } catch (error) {
            console.error(`error fetching user ${error.message}`)
            const errs = [new ErrorResponse(error.message, ErrorMessage.ERROR_USER_UPDATE)]
            res.status(500).send(errs)
        }
    }
}

module.exports = { UserController }