class Claims {
    constructor(sub, iss, iat, exp, aud, data) {
        this.sub = sub
        this.iss = iss
        this.exp = exp
        this.aud = aud
        this.iat = iat
        this.data = data
    }
}

class Token {
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}

module.exports = { Claims, Token }