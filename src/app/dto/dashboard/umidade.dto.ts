export class UmidadeDTO {

    constructor(
        private day: Date,
        private solo: number,
        private ar: number
    ) {
    }

    public static instance() {
        return new UmidadeDTO(null, 0, 0);
    }

    public getDay() {
        return this.day;
    }

    public getAr() {
        return this.ar;
    }

    public getSolo() {
        return this.solo;
    }
}
