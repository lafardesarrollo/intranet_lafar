import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DependienteSupervisor, HorasExtras, Turno } from './horasextras';
import { HorasExtrasService } from './horasextras.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AreasService } from '../../admin-intranet/areas/areas.service';
import { Areas } from '../../admin-intranet/areas/areas';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-horasextras',
  templateUrl: './horasextras.component.html',
  styleUrls: ['./horasextras.component.scss']
})
export class HorasextrasComponent implements OnInit {
  esValido: Boolean = false;
  public dependientes: Array<DependienteSupervisor> = new Array<DependienteSupervisor>();
  public he: HorasExtras = new HorasExtras();
  areas: Array<Areas> = new Array<Areas>();
  turnos: Array<Turno> = new Array<Turno>();

  refrigerio: Boolean= false;
  pasaje: Boolean = true;

  mensaje: String = '';

  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    // formatSubmit: 'yyyy-mm-dd',
    // onClose: () => alert('Cerraste el picker.'),
    // onOpen: () => alert('abriste el picker.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  constructor(private servHE: HorasExtrasService, private servArea: AreasService, private toast: MzToastService) { }

  ngOnInit() {
    this.onLoadTurnos();
    this.onLoadDependientes(localStorage.getItem('username'));
    this.onLoadAreas();
    this.he.hora_inicio = '00:00';
    this.he.hora_fin = '00:00';
    this.he.refrigerio = false;
    this.he.pasajes = false;
  }

  onSelectDependiente() {
    // alert(this.he.id_dependiente);
  }

  onSelectArea() {

  }

  onSelectTurno() {

  }

  onLoadDependientes(id_supervisor: string): void {
      this.servHE.DependienteSupervisor(id_supervisor).subscribe(
          data => {
              // console.log(data);
              this.dependientes = data.body;
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

  // Carga de informacion de areas productivas
  onLoadAreas() {
    this.servArea.getAreas().subscribe(
      data => {
        this.areas = data.body;
        // console.log(this.areas);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }

  onLoadTurnos() {
    this.servHE.getTurno().subscribe(
      data => {
        this.turnos = data.body;
        // console.log(this.turnos);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }

  onSaveHR() {
    this.esValido = this.validaFormulario();
    this.he.usuario_creacion = localStorage.getItem('username');
    this.he.usuario_modificacion = localStorage.getItem('username');

    if (this.esValido) {
      // console.log(this.he);
      this.servHE.saveHE(this.he).subscribe(
        data => {
          this.toast.show('Los Datos Fueron Guardados correctamente!', 3000, 'green rounded', () => { this.resetFormHE(); } );
          // console.log(this.turnos);
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error en el Servidor, Intente nuevamente!', 5000, 'red round');
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
      );
    }else {
      // console.log('No se puede guardar porque algunos campos no fueron llenados');
      this.toast.show('Algunos campos no fueron llenados, Revise Porfavor', 5000, 'red round');
    }
  }

  resetFormHE() {
    this.he = new HorasExtras();
    this.ngOnInit();
  }

  validaFormulario(): Boolean {
    if (this.he.fecha_fin == null || this.he.fecha_inicio == null || this.he.hora_inicio == '00:00'
      || this.he.fecha_fin == '00:00' || this.he.id_turno == null || this.he.id_area == null || this.he.id_dependiente == null) {
      return false;
    } else {
      return true;
    }
  }
}
