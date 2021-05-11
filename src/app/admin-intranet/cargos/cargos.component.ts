import { Component, OnInit } from '@angular/core';
import { CargosService } from './cargos.service';
import { Cargos } from './cargos';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  cargo: Cargos;
  cargosAll: any;

  constructor(private service: CargosService) { }

  ngOnInit() {
  }

  onLoadCargos() {
    this.cargo = new Cargos();
      this.service.getCargos().subscribe(
      data => {
        this.cargosAll = data.body;
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
}
