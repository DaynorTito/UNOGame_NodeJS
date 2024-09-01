export class HistoryDto {

    constructor (dbUser) {
        this.dbUser = dbUser;
    }

    getHistory () {
        return {
            player: this.dbUser.player,
            action: this.dbUser.action
        }
    }
}