const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse } = require("../model/response");
const { UserRequest } = require("../model/user");

class Middleware {
    constructor(cryptoService, userService) {
        this.cryptoService = cryptoService
        this.userService = userService
    }

    async authenticate(req, res, next) {
        try {
            // get header authorization
            const authorization = req.header("Authorization")
            // verify jwt ? 
            if (!authorization) {
                console.error("unauthorized request")
                throw new Error("unauthorized request")
            }
            const claim = await this.cryptoService.verifyUserToken(authorization)
            // check user by id
            const { sub } = claim
            const user = await this.userService.getUserById(sub)
            if (!user) {
                throw new Error(ErrorMessage.ERROR_USER_NOT_FOUND)
            }
            next()
        } catch (error) {
            const errs = [new ErrorResponse(error.message, "hehe")]
            res.status(401).send(errs)

        }
    }
}

module.exports = { Middleware }