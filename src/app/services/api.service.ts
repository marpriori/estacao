import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { MedicaoDTO } from 'app/dto/medicao.dto';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { DashboardDTO } from 'app/dto/dashboard.dto';
import { HojeDTO } from 'app/dto/dashboard/hoje.dto';
import { SemanaDTO } from 'app/dto/dashboard/semana.dto';
import { TemperaturaDTO } from 'app/dto/dashboard/temperatura.dto';
import { AnoDTO } from 'app/dto/dashboard/ano.dto';
import { ChuvaDTO } from 'app/dto/dashboard/chuva.dto';
import { VentoDTO } from 'app/dto/dashboard/vento.dto';
import { UmidadeArDTO } from 'app/dto/dashboard/umidadeAr.dto';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  // API: GET /
  public getAll(): Observable<MedicaoDTO[]> {
    return this.http
      .get(API_URL + '/')
      .map(response => {
        const data = response.json();
        return data.map((registro) => new MedicaoDTO(
          registro.id,
          registro.registradoEm,
          registro.chuva,
          registro.temperatura,
          registro.vento,
          registro.umidadeSolo,
          registro.umidadeAr
        ));
      })
      .catch(this.handleError);
  }

  //API: GET /dashboard
  public getAgora(): Observable<DashboardDTO> {
    return this.http
      .get(API_URL + '/dashboard')
      .map(response => {
        const registro = response.json();
        return new DashboardDTO(
          new HojeDTO(
            registro.hoje.chuva,
            registro.hoje.registradoEm,
            registro.hoje.temperatura,
            registro.hoje.vento,
            registro.hoje.umidadeSolo,
            registro.hoje.umidadeAr
          ),
          new SemanaDTO(
            registro.semana.umidade.map(item => {
              return new UmidadeArDTO(
                item.day,
                item.max,
                item.min
              )
            }),
            registro.semana.temperatura.map(item => {
              return new TemperaturaDTO(
                item.day,
                item.max,
                item.min
              )
            })
          ),
          new AnoDTO(
            registro.ano.chuva.map(item => {
              return new ChuvaDTO(
                new Date(item.month+'-02'),
                item.total
              )
            }),
            registro.ano.vento.map(item => {
              return new VentoDTO(
                new Date(item.month+'-02'),
                item.max,
                item.min,
                item.avg
              )
            })
          )
        );
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
