import { Component, OnInit } from '@angular/core';
import { MzToastService, MzModalService } from 'ngx-materialize';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { SolicitudHoraExtra, HoraExtra } from '../models/horaextra';


@Component({
  selector: 'app-he-aprobar-solicitudes',
  templateUrl: './he-aprobar-solicitudes.component.html',
  styleUrls: ['./he-aprobar-solicitudes.component.scss']
})
export class HeAprobarSolicitudesComponent implements OnInit {
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

    //#region  LISTADO DE SOLICITUDES
    ObtenerSolicitudes(){ 
        this.loading.fadeIn();
        this.heService.obtenerSolicitudes().subscribe(
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

    AprobarSolicitudHoraExtra(horasE: SolicitudHoraExtra){
        this.loading.fadeIn();
        this.heService.cambiarEstadoSolicitud('APROBADO', horasE.Id).subscribe(resp => {
            if(resp.status){
                this.toast.show('Se aprobo la solicitud correctamente!', 1500, 'blue');
            } else {
                this.toast.show('Ocurrio un error al aprobar la solicitud', 1500, 'red');
            }
            this.ObtenerSolicitudes();
        }, error => {
            this.toast.show('Ocurrio un error al comunicarse con el servidor', 1500, 'error');
        }).add(()=> {
            this.loading.fadeOut();
        });
    }
    
    RechazarSolicitudHoraExtra(horasE: SolicitudHoraExtra){
        this.loading.fadeIn();
        this.heService.cambiarEstadoSolicitud('RECHAZADO', horasE.Id).subscribe(resp => {
            if(resp.status){
                this.toast.show('Se rechazo la solicitud correctamente!', 1500, 'blue');
            } else {
                this.toast.show('Ocurrio un error al rechazar la solicitud', 1500, 'red');
            }
            this.ObtenerSolicitudes();
        }, error => {
            this.toast.show('Ocurrio un error al comunicarse con el servidor', 1500, 'error');
        }).add(()=> {
            this.loading.fadeOut();
        });
    }

    //#endregion

    //#region DETALLE DE SOLICITUD

    ObtenerDetalleSolicitud(IdSolicitud: number){ 
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
