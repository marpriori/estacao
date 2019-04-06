import { Component, OnInit } from '@angular/core';
import { MedicaoDTO } from 'app/dto/medicao.dto';
import { DataService } from 'app/services/data.service';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [DataService, ApiService]
})
export class TableListComponent implements OnInit {

  protected lista: MedicaoDTO[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAll().subscribe((registros) => this.lista = registros);
  }

}
