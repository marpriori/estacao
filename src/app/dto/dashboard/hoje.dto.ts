export class HojeDTO {

    constructor(
        private chuva: number,
        private registradoEm: Date,
        private temperatura: number,
        private vento: number,
        private umidadeSolo: number,
        private umidadeAr: number
    ) {
    }

    public static instance() {
        return new HojeDTO(0, null, 0, 0, 0, 0);
    }

    public getRegistradoEm() {
        return this.registradoEm;
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

    public getUmidadeAr() {
        return this.umidadeSolo;
    }

    public getUmidadeSolo() {
        return this.umidadeAr;
    }
}
