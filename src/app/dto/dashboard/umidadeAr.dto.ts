export class UmidadeArDTO {

    constructor(
        private day: Date,
        private max: number,
        private min: number
    ) {
    }

    public static instance() {
        return new UmidadeArDTO(null, 0, 0);
    }

    public getDay() {
        return this.day;
    }

    public getMax() {
        return this.max;
    }

    public getMin() {
        return this.min;
    }
}
