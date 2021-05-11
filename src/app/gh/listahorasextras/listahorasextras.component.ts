import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { MzToastService } from 'ngx-materialize';
import { Lhorasextras } from './lhorasextras';
import { HttpErrorResponse } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listahorasextras',
  templateUrl: './listahorasextras.component.html',
  styleUrls: ['./listahorasextras.component.scss']
})
export class ListahorasextrasComponent implements OnInit {
  filter: any;
  // Ordenacion
  key: string = 'fecha_inicial';
  reverse: boolean = false;
  p: number = 1;

  lhorasextras: Array<Lhorasextras> = new Array<Lhorasextras>();
  constructor(private servHE: HorasExtrasService, private toast: MzToastService) { }

  ngOnInit() {
    this.onLoadHorasExtras();
  }

  onLoadHorasExtras() {
    this.servHE.getHE().subscribe(
      data => {
        this.lhorasextras = data.body;
        // console.log('Lista de Horas Extra cargado correctamente!');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  exportar():void {
    let sheetName1 = 'Horas Extras';
    var tbhe = document.getElementById('tHE');
    var ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tbhe, {raw:true});
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, sheetName1);
    XLSX.writeFile(wb, 'horasextras.xlsx', {type: 'base64'});
  }
}
