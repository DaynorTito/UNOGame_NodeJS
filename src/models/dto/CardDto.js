export class CardDto {

    constructor (dbUser) {
        this.dbUser = dbUser;
    }

    getCard () {
        return {
            color: this.dbUser.color,
            value: this.dbUser.value,
            point: this.dbUser.point
        }
    }
}