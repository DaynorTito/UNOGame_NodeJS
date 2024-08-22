export class UserDto {

    constructor (dbUser) {
        this.dbUser = dbUser;
    }

    getUser () {
        return {
            username: this.dbUser.username,
            age: this.dbUser.age,
            email: this.dbUser.email
        }
    }
}