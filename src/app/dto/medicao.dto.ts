export class MedicaoDTO {

    constructor(
        private id: BigInteger,
        private registrado_em: Date,
        private chuva: number,
        private temperatura: number,
        private vento: number,
        private humidade_solo: number,
        private humidade_ar: number
    ) {
    }

    public getId() {
        return this.id;
    }

    public getRegistradoEm() {
        return this.registrado_em;
    }

    public getChuva() {
        return this.chuva;
    }

    public getTemperatura() {
        return this.temperatura;
    }

    public getVento() {
        return this.vento;
    }

    public getHumidadeAr() {
        return this.humidade_ar;
    }

    public getHumidadeSolo() {
        return this.humidade_solo;
    }
}
