import { Injectable } from '@angular/core';
import { MedicaoDTO } from 'app/dto/medicao.dto';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private api: ApiService) { }

  // API: GET /
  public getAll(): Observable<MedicaoDTO[]> {
    return this.api.getAll();
  }

  //API GET /?tempo=agora
  public getAgora(): Observable<MedicaoDTO> {
    return this.api.getAgora();
  }
}