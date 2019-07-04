import { HojeDTO } from "./dashboard/hoje.dto";
import { SemanaDTO } from "./dashboard/semana.dto";
import { AnoDTO } from "./dashboard/ano.dto";

export class DashboardDTO {

    constructor(
        private hoje: HojeDTO,
        private semana: SemanaDTO,
        private ano: AnoDTO
    ) {
    }

    public static instance() {
        return new DashboardDTO(
            HojeDTO.instance(),
            SemanaDTO.instance(),
            AnoDTO.instance()
        );
    }

    public getHoje() {
        return this.hoje;
    }

    public getSemana() {
        return this.semana;
    }

    public getAno() {
        return this.ano;
    }
}
