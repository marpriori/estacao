import { UmidadeArDTO } from "./umidadeAr.dto";
import { TemperaturaDTO } from "./temperatura.dto";

export class SemanaDTO {

    constructor(
        private umidade: UmidadeArDTO[],
        private temperatura: TemperaturaDTO[]

    ) {
    }

    public static instance() {
        return new SemanaDTO(
            new Array<UmidadeArDTO>(),
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
