import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { MedicaoDTO } from 'app/dto/medicao.dto';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  private zero = new Uint8Array([0]);

  constructor(private http: Http) { }

  // API: GET /
  public getAll(): Observable<MedicaoDTO[]> {
    return this.http
      .get(API_URL + '/')
      .map(response => {
        const data = response.json();
        return data.map((registro) => new MedicaoDTO(
          registro.id,
          registro.registrado_em,
          registro.chuva,
          registro.temperatura,
          registro.vento,
          registro.umidade_solo,
          registro.umidade_ar
        ));
      })
      .catch(this.handleError);
  }

  //API: GET /?tempo=agora
  public getAgora(): Observable<MedicaoDTO> {
    return this.http
      .get(API_URL + '/?tempo=agora')
      .map(response => {
        const registro = response.json();
        return new MedicaoDTO(
          this.zero,
          registro.registrado_em,
          registro.chuva,
          registro.temperatura,
          registro.vento,
          registro.umidade_solo,
          registro.umidade_ar
        );
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
