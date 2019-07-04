export class ChuvaDTO {

    constructor(
        private month: Date,
        private total: number
    ) {
    }

    public static instance() {
        return new ChuvaDTO(null, 0);
    }

    public getMonth() {
        return this.month;
    }

    public getTotal() {
        return this.total;
    }
}
