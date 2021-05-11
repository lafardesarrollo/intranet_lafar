import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { EtapasProcesoService } from '../etapasproceso.service';
import { EtapasForLote, EtapasForLoteAll } from '../etapasproceso';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-repthrproceso',
  templateUrl: './repTHRProceso.component.html',
  styleUrls: ['./repTHRProceso.component.scss']
})
export class RepTHRProcesoComponent implements OnInit {
	public etapas: Array<EtapasForLote> = new Array<EtapasForLote>();
	public etapa: EtapasForLote = new EtapasForLote();
  public numero_lote: any = '';
  
  public letapas:Array<String> = Array<String>();
  public lmonitoreo: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>();

  // Lista de Procesos
  public ldosificado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // DOSIFICADO
  public lpreparacion: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // PREPARACIÓN
  public lblisteado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // BLISTEADO
  public ltamizado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // TAMIZADO
  public ltableteado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // TABLETEADO
  public lrevestido: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // REVESTIDO
  public lencapsulado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // ENCAPSULADO
  public lfoliado: Array<EtapasForLoteAll> = new Array<EtapasForLoteAll>(); // FOLIADO

  //Estado de Procesos
  public esDOSIFICADO: Boolean = false;
  public esPREPARACION: Boolean = false;
  public esBLISTEADO: Boolean = false;
  public esTAMIZADO: Boolean = false;
  public esTABLETEADO: Boolean = false;
  public esREVESTIDO: Boolean = false;
  public esENCAPSULADO: Boolean = false;
  public esFOLIADO: Boolean = false;

  constructor(private servEtapaProceso: EtapasProcesoService, private toast: MzToastService) { }

  ngOnInit() {
    this.onCargarListaEtapas();
  }

  onCargarListaEtapas(){
    this.letapas.push('DOSIFICADO');
    this.letapas.push('PREPARACION');
    this.letapas.push('BLISTEADO');
    this.letapas.push('TAMIZADO');
    this.letapas.push('TABLETEADO');
    this.letapas.push('REVESTIDO');
    this.letapas.push('ENCAPSULADO');
    this.letapas.push('FOLIADO');
  }
  
  onConfiguracionInicial(){
    this.esDOSIFICADO = false;
    this.esPREPARACION = false;
    this.esBLISTEADO = false;
    this.esTAMIZADO = false;
    this.esTABLETEADO = false;
    this.esREVESTIDO = false;
    this.esENCAPSULADO = false;
    this.esFOLIADO = false;

    // Lista de Procesos
    this.ldosificado = new Array<EtapasForLoteAll>(); // DOSIFICADO
    this.lpreparacion = new Array<EtapasForLoteAll>(); // PREPARACIÓN
    this.lblisteado = new Array<EtapasForLoteAll>(); // BLISTEADO
    this.ltamizado = new Array<EtapasForLoteAll>(); // TAMIZADO
    this.ltableteado = new Array<EtapasForLoteAll>(); // TABLETEADO
    this.lrevestido = new Array<EtapasForLoteAll>(); // REVESTIDO
    this.lencapsulado = new Array<EtapasForLoteAll>(); // ENCAPSULADO
    this.lfoliado = new Array<EtapasForLoteAll>(); // FOLIADO
  }
  export(): void {
    debugger;
    let sheetName1 = 'DOSIFICADO';
    let sheetName2 = 'PREPARACION';
    let sheetName3 = 'BLISTEADO';
    let sheetName4 = 'TAMIZADO';
    let sheetName5 = 'TABLETEADO';
    let sheetName6 = 'REVESTIDO';
    let sheetName7 = 'ENCAPSULADO';
    let sheetName8 = 'FOLIADO';

    var tb1 = document.getElementById('tDOSIFICADO');
    var tb2 = document.getElementById('tPREPARACION');
    var tb3 = document.getElementById('tBLISTEADO');
    var tb4 = document.getElementById('tTAMIZADO');
    var tb5 = document.getElementById('tTABLETEADO');
    var tb6 = document.getElementById('tREVESTIDO');
    var tb7 = document.getElementById('tENCAPSULADO');
    var tb8 = document.getElementById('tFOLIADO');

		/* generate worksheet */
    if(tb1!=null){var ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb1, {raw: true});}
    if(tb2!=null){var ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb2, {raw: true});}
    if(tb3!=null){var ws3: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb3, {raw: true});}
    if(tb4!=null){var ws4: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb4, {raw: true});}
    if(tb5!=null){var ws5: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb5, {raw: true});}
    if(tb6!=null){var ws6: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb6, {raw: true});}
    if(tb7!=null){var ws7: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb7, {raw: true});}
    if(tb8!=null){var ws8: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tb8, {raw: true});}

			/* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    if(this.ldosificado.length>0){
      XLSX.utils.book_append_sheet(wb, ws1, sheetName1);
    }
    if(this.lpreparacion.length>0){
      XLSX.utils.book_append_sheet(wb, ws2, sheetName2);
    }
    if(this.lblisteado.length>0){
      XLSX.utils.book_append_sheet(wb, ws3, sheetName3);
    }
    if(this.ltamizado.length>0){
      XLSX.utils.book_append_sheet(wb, ws4, sheetName4);
    }
    if(this.ltableteado.length>0){
      XLSX.utils.book_append_sheet(wb, ws5, sheetName5);
    }
    if(this.lrevestido.length>0){
      XLSX.utils.book_append_sheet(wb, ws6, sheetName6);
    }
    if(this.lencapsulado.length>0){
      XLSX.utils.book_append_sheet(wb, ws7, sheetName7);
    }
    if(this.lfoliado.length>0){
      XLSX.utils.book_append_sheet(wb, ws8, sheetName8);
    }

			/* save to file */
		XLSX.writeFile(wb, this.numero_lote + '.xlsx', {type: 'base64'});
	}

	onLoadProcesoForLote() {
		//this.etapa.lote = this.numero_lote.replace('/', '|');
    this.onLoadEtapasForLote(this.numero_lote.replace('/', '|'));
    this.onLoadMonitoreoForLote(this.numero_lote.replace('/', '|'));
	}

  onLoadEtapasForLote(datos) {
    this.servEtapaProceso.getEtapaLote(datos).subscribe(
      data => {
        if(data['length'] == 0){
          this.onConfiguracionInicial();
          this.toast.show('No se trajo ningún registro!', 3000, 'red');
        } else {
          this.etapas = data['body'];
          this.onSeleccionaEtapas();
          this.toast.show('Los datos fueron cargados correctamente!', 3000, 'green');
        }
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

  onSeleccionaEtapas() {
    this.etapas.forEach(element => {
      if(element['nombre_etapa'] == 'DOSIFICADO'){ this.esDOSIFICADO=true; }
      if(element['nombre_etapa'] == 'PREPARACION'){ this.esPREPARACION=true; }
      if(element['nombre_etapa'] == 'BLISTEADO'){ this.esBLISTEADO=true; }
      if(element['nombre_etapa'] == 'TAMIZADO'){ this.esTAMIZADO=true; }
      if(element['nombre_etapa'] == 'TABLETEADO'){ this.esTABLETEADO=true; }
      if(element['nombre_etapa'] == 'REVESTIDO'){ this.esREVESTIDO=true; }
      if(element['nombre_etapa'] == 'ENCAPSULADO'){ this.esENCAPSULADO=true; }
      if(element['nombre_etapa'] == 'FOLIADO'){ this.esFOLIADO=true; }
    });
  }

  onSeleccionaMonitoreo(){
    this.lmonitoreo.forEach(element => {
      let proc: String = element['nombre_etapa'];
      switch(proc){
        case 'DOSIFICADO': this.ldosificado.push(element); break;
        case 'PREPARACION': this.lpreparacion.push(element); break;
        case 'BLISTEADO': this.lblisteado.push(element); break;
        case 'TAMIZADO': this.ltamizado.push(element); break;
        case 'TABLETEADO': this.ltableteado.push(element); break;
        case 'REVESTIDO': this.lrevestido.push(element); break;
        case 'ENCAPSULADO': this.lencapsulado.push(element); break;
        case 'FOLIADO': this.lfoliado.push(element); break;
      }
    });
  }

  onLoadMonitoreoForLote(datos) {
    this.servEtapaProceso.getMonitoreoForLote(datos).subscribe(
      data => {
        this.lmonitoreo = data['body'];
        // console.log(this.lmonitoreo);
        this.onSeleccionaMonitoreo();
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
  
  onLoadTHREtapaLote(etapa: EtapasForLote) {
    this.servEtapaProceso.getEtapaLote(etapa).subscribe(
      data => {
				this.etapas = data['body'];
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
}
