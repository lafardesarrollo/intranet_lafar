import { Component, OnInit } from '@angular/core';
import { MzToastService, MzModalService } from 'ngx-materialize';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { DetalleSolicitudHoraExtraGG } from '../models/detallesolicitudhoraextragg.model';
import { SolicitudHoraExtra, HoraExtra } from '../models/horaextra';
import { ItemSolicitudHoraExtraGG } from '../models/itemsolicitudhoraextragg.model';


@Component({
  selector: 'app-he-aprobar-solicitudes-gg',
  templateUrl: './he-aprobar-solicitudes-gg.component.html',
  styleUrls: ['./he-aprobar-solicitudes-gg.component.scss']
})
export class HeAprobarSolicitudesGgComponent implements OnInit {
    loading = $('#loading');

    solicitudes: Array<SolicitudHoraExtra> = new Array<SolicitudHoraExtra>();
    
    solicitudesgg: Array<DetalleSolicitudHoraExtraGG> = new Array<DetalleSolicitudHoraExtraGG>();
    itemsolicitudesgg: Array<ItemSolicitudHoraExtraGG> = new Array<ItemSolicitudHoraExtraGG>();

    detalleSolicitud: Array<HoraExtra> = new Array<HoraExtra>();

    costoTotalSolicitudes: number = 0;

    term: string ='';
    estado: string = 'PENDIENTE';
    fecha_seleccionada: Date = new Date();
    fecha_corta: string='';

    HighlightRow : Number;
    ClickedRow:any; 
    constructor(
        private toast: MzToastService, 
        private heService: HorasExtrasService) { 
            this.ClickedRow = function(index){
                this.HighlightRow = index;
            }
        }

    ngOnInit() {

        this.ObtenerSolicitudes();
        this.ObtenerSolicitudesGG();
    }

    //#region  LISTADO DE SOLICITUDES
    ObtenerSolicitudesGG(){ 
        this.loading.fadeIn();
        this.heService.obtenerSolicitudesGG(this.estado).subscribe(
            resp => {
                this.solicitudesgg = resp;
            }, error => {
                this.toast.show('Ocurrio un error al obtener Solicitudes', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    ObtenerItemSolicitudesGG(fecha_seleccionada: Date){ 
        this.fecha_seleccionada = fecha_seleccionada;
         
        let fecha: string = new Date(fecha_seleccionada).toISOString();
        this.fecha_corta = fecha.split("T",2)[0];
        let nueva_fecha: string = fecha.substring(0,10);
        
        this.loading.fadeIn();
        this.heService.obtenerItemsSolicitudesGG(nueva_fecha).subscribe(
            resp => {
                this.itemsolicitudesgg = resp;
            }, error => {
                this.itemsolicitudesgg = [];
                this.toast.show('No se encontraron Items para esta solicitud', 1500, 'blue');
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    EliminarItem(item: ItemSolicitudHoraExtraGG){
        // alert(item.IdDetalleSolicitud);
        var txt;
        var r = confirm("Esta seguro que desea quitar este personal de la solicitud!");
        if (r == true) {
            this.QuitarEmpleadoSolicitud(item);
        } else {
            txt = "Se presionó cancelar";
        }
    }

    QuitarEmpleadoSolicitud(item: ItemSolicitudHoraExtraGG){
        this.loading.fadeIn();
        this.heService.cambiarEstadoItemSolicitudRestandoCosto(item).subscribe(
            resp => {
                this.ObtenerItemSolicitudesGG(this.fecha_seleccionada);
                if (this.itemsolicitudesgg.length === 1) {
                   this.cambiarEstadoSolicitudesPorFechaGG (this.fecha_corta);
                }
                
                //this.itemsolicitudesgg
                this.toast.show('Se quito de la solicitud correctamente', 1000, 'blue');
            }, error => {
                this.toast.show('Ocurrio un error al quitar el empleado de la solicitud', 1000);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }
    

    cambiarEstadoSolicitudesPorFechaGG(item: string){
        this.loading.fadeIn();
        this.heService.cambiarEstadoSolicitudesPorfechaGG(item).subscribe(
            resp => {
                //this.ObtenerItemSolicitudesGG(this.fecha_seleccionada);
                this.itemsolicitudesgg = new Array<ItemSolicitudHoraExtraGG>();
                this.toast.show('Se realizaron los cambios en las solicitudes ', 1000, 'blue');
                this.fecha_corta = "";
                this.ObtenerSolicitudesGG();
                
            }, error => {
                this.toast.show('Ocurrio un error al realizar los cambios', 1000);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    SeleccionaSolicitud(){

    }

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

    //aceptar solicitud de una determinada fecha
    aceptarSolicitudGGporfecha(fecha: string){
        alert(fecha);
    }

}
