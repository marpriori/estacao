export class VentoDTO {

    constructor(
        private month: Date,
        private max: number,
        private min: number,
        private avg: number
    ) {
    }

    public static instance() {
        return new VentoDTO(null, 0, 0, 0);
    }

    public getMonth() {
        return this.month;
    }

    public getMin() {
        return this.min;
    }

    public getMax() {
        return this.max;
    }

    public getAvg() {
        return this.avg;
    }
}
