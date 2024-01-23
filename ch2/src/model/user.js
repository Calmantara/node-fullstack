class User{
    constructor(id, name, email, dob, deletedAt){
        this.id = id
        this.name = name
        this.email = email
        this.dob = dob
        this.deletedAt = deletedAt
    }

    greeting(){
        console.log(`hello ${this.name}`)
    }
}

class UserReq {
    constructor(name, email, dob){
        this.name = name
        this.email = email
        this.dob = dob
    }

    isValid(){
        return this.name !== undefined ||
        this.dob !== undefined ||
        this.email !== undefined
    }
}

module.exports = {User, UserReq}