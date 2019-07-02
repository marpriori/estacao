export class MedicaoDTO {

    constructor(
        private id: string,
        private registrado_em: Date,
        private chuva: number,
        private temperatura: number,
        private vento: number,
        private umidade_solo: number,
        private umidade_ar: number
    ) {
    }

    public static instance()
    {
        return new MedicaoDTO(
            "",
            null,
            0,0,0,0,0
        );
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

    public getUmidadeAr() {
        return this.umidade_ar;
    }

    public getUmidadeSolo() {
        return this.umidade_solo;
    }
}
