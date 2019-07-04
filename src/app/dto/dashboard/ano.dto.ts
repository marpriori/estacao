import { ChuvaDTO } from "./chuva.dto";
import { VentoDTO } from "./vento.dto";

export class AnoDTO {

    constructor(
        private chuva: ChuvaDTO[],
        private vento: VentoDTO[]

    ) {
    }

    public static instance() {
        return new AnoDTO(
            new Array<ChuvaDTO>(),
            new Array<VentoDTO>()
        );
    }

    public getChuva() {
        return this.chuva;
    }

    public getVento() {
        return this.vento;
    }

}
