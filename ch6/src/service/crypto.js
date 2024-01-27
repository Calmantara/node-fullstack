const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Claims, Token } = require("../model/token")
const moment = require("moment")

class Crypto {
    constructor(sessionConfig) {
        this.sessionConfig = sessionConfig
    }
    async generatePassword(password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            return hashed
        } catch (error) {
            throw error
        }
    }

    async comparePassword(password, hashed) {
        try {
            return await bcrypt.compare(password, hashed)
        } catch (error) {
            throw error
        }
    }

    async createUserToken(userData) {
        // membuat claim
        // sub, iss, iat, exp, aud, data
        const now = new Date()
        const exp = (Date.now() / 1000) + (60 * 60 * this.sessionConfig.accessExpires)
        const claims = new Claims(
            userData.id,
            this.sessionConfig.issuer,
            now,
            exp,
            this.sessionConfig.audience,
            {
                "username": userData.username,
                "dob": userData.dob
            }
        )

        const expRefresh = (Date.now() / 1000) + (60 * 60 * this.sessionConfig.refreshExpires)
        const refreshClaims = new Claims(
            userData.id,
            this.sessionConfig.issuer,
            now,
            expRefresh,
            this.sessionConfig.audience,
            {
                "username": userData.username,
                "dob": userData.dob
            }
        )

        // membuat jwt accessToken dan refreshToken
        const accessToken = jwt.sign(JSON.stringify(claims), this.sessionConfig.secret)
        const refreshToken = jwt.sign(JSON.stringify(refreshClaims), this.sessionConfig.secret)

        // generate token model
        const tokens = new Token(accessToken, refreshToken)
        return tokens
    }

    async verifyUserToken(token) {
        // const claimX = jwt.decode(token)
        const claim = jwt.verify(token, this.sessionConfig.secret)
        // expire
        const now = Date.now()
        if ((claim.exp * 1000) < now) {
            throw new Error("expired token")
        }
        // issuer
        const { iss } = claim
        // validate issuer ?? 
        return claim
    }
}

module.exports = { Crypto }