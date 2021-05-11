import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { Area } from '../models/area.model';
import { RequestReporteSemanal, ReporteSemanal } from '../models/reporte.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-he-reporte-semanal',
  templateUrl: './he-reporte-semanal.component.html',
  styleUrls: ['./he-reporte-semanal.component.scss']
})
export class HeReporteSemanalComponent implements OnInit {
    loading = $('#loading');  

    request: RequestReporteSemanal = new RequestReporteSemanal();
    areas: Array<Area> = new Array<Area>();
    reporte: Array<ReporteSemanal> = new Array<ReporteSemanal>(); // Reporte semanal
    options: Pickadate.DateOptions = {
        clear: 'Borrar', // Clear button text
        close: 'Ok',    // Ok button text
        today: 'Hoy', // Today button text
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        closeOnClear: true,
        closeOnSelect: false,
        format: 'yyyy-mm-dd',
        // formatSubmit: 'yyyy-mm-dd',
        // onClose: () => alert('Cerraste el picker.'),
        // onOpen: () => alert('abriste el picker.'),
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 10,    // Creates a dropdown of 10 years to control year,
      };

    constructor(
        private toast: MzToastService, 
        private heService: HorasExtrasService) { }

    ngOnInit() {
        this.ObtenerAreas();
    }

    ObtenerAreas(){ // Obtiene los areas
        this.loading.fadeIn();
        this.heService.getAreas().subscribe(
            resp => {
                if(resp.status) {
                    this.areas = resp.body;
                    if(resp.length == 0) {
                        this.toast.show('No existen Areas', 1500);
                    } 
                } else {
                    this.toast.show('Ocurrio un error al obtener Areas', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener Areas', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    validarCampos(){
        if(this.request.FechaDesde){
             if(this.request.FechaHasta)  {
                this.generarReporte();
             } else {
                this.toast.show('Es necesario que ingrese la fecha final', 1500, 'red');
             }
        } else {
            this.toast.show('Es necesario que ingrese la fecha de inicio', 1500, 'red');
        }
    }

    // Generar Reporte
    generarReporte(){
        this.heService.generarReporteSemanal(this.request).subscribe(resp => {
            if(resp.status){
                this.reporte = resp.body;
            } else {
                this.toast.show('Ocurrio un error al generar el Reporte', 1500, 'red');
            }
        }, error => {
            this.toast.show('Ocurrio un error en el Servidor!', 1500, 'red');
        });
    }

    // Descargar el documento
    descargarExcel(): void{
        this.loading.show();
        this.heService.descargarReporteSemanal(this.request)
        .subscribe(resp=> {
            
            saveAs(resp, 'Reporte.xlsx');
        },
        error => {
            this.toast.show('Ocurrio un error al descargar el archivo, Intente nuevamente!', 1500 , 'red');
        }).add(()=> {
            this.loading.fadeOut();
        });
    }
}
