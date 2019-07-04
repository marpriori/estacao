export class TemperaturaDTO {

    constructor(
        private day: Date,
        private max: number,
        private min: number
    ) {
    }

    public static instance() {
        return new TemperaturaDTO(null, 0, 0);
    }

    public getDay() {
        return this.day;
    }

    public getMin() {
        return this.min;
    }

    public getMax() {
        return this.max;
    }
}
