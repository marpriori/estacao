import { UmidadeDTO } from "./umidade.dto";
import { TemperaturaDTO } from "./temperatura.dto";

export class SemanaDTO {

    constructor(
        private umidade: UmidadeDTO[],
        private temperatura: TemperaturaDTO[]

    ) {
    }

    public static instance() {
        return new SemanaDTO(
            new Array<UmidadeDTO>(),
            new Array<TemperaturaDTO>()
        );
    }

    public getUmidade() {
        return this.umidade;
    }

    public getTemperatura() {
        return this.temperatura;
    }
}
