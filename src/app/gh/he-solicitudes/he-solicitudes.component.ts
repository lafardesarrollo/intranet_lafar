import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { SolicitudHoraExtra, HoraExtra } from '../models/horaextra';

@Component({
  selector: 'app-he-solicitudes',
  templateUrl: './he-solicitudes.component.html',
  styleUrls: ['./he-solicitudes.component.scss']
})
export class HeSolicitudesComponent implements OnInit {
    loading = $('#loading');  

    solicitudes: Array<SolicitudHoraExtra> = new Array<SolicitudHoraExtra>();
    detalleSolicitud: Array<HoraExtra> = new Array<HoraExtra>();

    costoTotalSolicitudes: number = 0;

    term: string ='';
    constructor(
        private toast: MzToastService, 
        private heService: HorasExtrasService) { }

    ngOnInit() {
        this.ObtenerSolicitudes();
    }


    ObtenerSolicitudes(){ 
        this.loading.fadeIn();
        this.heService.obtenerSolicitudesPorUsername(localStorage.getItem("username")).subscribe(
            resp => {
                if(resp.status) {
                    this.solicitudes = resp.body;
                    this.calcularTotal();
                    if(resp.length == 0) {
                        this.toast.show('No existen Solicitudes', 1500);
                    } 
                } else {
                    this.toast.show('Ocurrio un error al obtener Solicitudes', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener Solicitudes', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    // Calcular total del Costo de las Solicitudes
    calcularTotal(){
        let sum = this.solicitudes.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.CostoTotal;
        }, 0);
        this.costoTotalSolicitudes = sum;
    }

    // ver detalle de la solicitud
    verDetalleSolicitud(horasE: SolicitudHoraExtra){
        console.log(horasE);
    }

    //#region DETALLE DE SOLICITUD

    ObtenerDetalleSolicitud(IdSolicitud: number){ 
        this.detalleSolicitud = [];
        this.loading.fadeIn();
        this.heService.obtenerDetalleSolicitud(IdSolicitud).subscribe(
            resp => {
                if(resp.status) {
                    this.detalleSolicitud = resp.body;
                    if(resp.length == 0) {
                        this.toast.show('No existen Solicitudes', 1500);
                    } 
                } else {
                    this.toast.show('Ocurrio un error al obtener Solicitudes', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener Solicitudes', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    //#endregion

    filtrarRegistros(valor: string){
        this.term = valor;
        console.log(this.term);
    }
}
