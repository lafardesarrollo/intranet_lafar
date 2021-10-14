import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Solicitudcompralistado, SolicitudCompra, RequestAnulacionSolicitud,
  RequestAutorizacionSolicitud } from '../../solicitud/solicitud';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdenService } from '../orden.service';
import { OrdenCompraListAbastecimiento, OCOrdenCompra } from '../orden';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-listoc',
  templateUrl: './listoc.component.html',
  styleUrls: ['./listoc.component.scss'],
})
export class ListocComponent implements OnInit {
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // The Dialog shows within the target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public animationSettings: Object = { effect: 'Zoom', duration: 400, delay: 0 };

  lopor: any; // Listado de Ordenes de Compra por Syncronizar
  numero_sincronizadas: number = 0;
  // Variables de Paginación
  p: number = 1;

  // Existen Ordenes para transferir
  transferencia: Boolean = false;

  // Anulacion de Solicitud
  aorden: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();

  // vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion_subgerencia: string;
  // END VARIABLES DE BUSQUEDA

  lorden: Array<OrdenCompraListAbastecimiento> = new Array<OrdenCompraListAbastecimiento>();
  orden: OCOrdenCompra = new OCOrdenCompra();

  constructor(private servSC: SolicitudService, private servOC: OrdenService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.estado_autorizacion_subgerencia = 'P';
    this.onLoadListado();
    this.onVerificaEstadoTransferenciaOC();
    // this.onGetOrdenesCompra();
    // this.initilaizeTarget();
  }

//#region MODAL CONFIRMACIÓN
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  // Sample level code to handle the button click action
  public onOpenDialog = function(event: any): void {
      // Call the show method to open the Dialog
    this.ejDialog.show();
  }

  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  }
  // Sample level code to hide the Dialog when click the Dialog overlay
  public onOverlayClick: EmitType<object> = () => {
    // this.ejDialog.hide();
  }

  public validation(event: any): void {
    this.openLoading();
    console.log('Guardar OCSAP');
    this.servOC.guardarOCSAP(this.lopor).subscribe(
      data => {
        debugger;
        console.log(data);
        this.closeLoading();
        if (data['result']) {
          this.toast.show(data['mensaje'], 2000, 'blue');
        } else {
          this.toast.show(data['mensaje'], 2000, 'red');
        }
        this.actualizaEstadoSincronizacion(data['body']);
      }, (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al conectarnos con el Servidor SAP', 2000, 'red');
      }
    );
  }

  public actualizaEstadoSincronizacion(codigos: any) {
    this.openLoading();
    this.servOC.actualizaEstadoSincronizacionOC(codigos).subscribe(
      data => {
        this.closeLoading();
        if (data['result']) {
          this.onGetOrdenesCompra();
          this.onVerificaEstadoTransferenciaOC();
        } else {
          this.toast.show('Ocurrio un error al actualizar los estados de las Ordenes de Compra', 2000, 'red');
        }
      }, (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error con el Servidor', 2000, 'red');
      }
    );
  }
  // Enables the footer buttons
  public buttons: Object = [
    {
        'click': this.hideDialog.bind(this),
          // Accessing button component properties by buttonModel property
          buttonModel:{
          content:'Aceptar',
          // Enables the primary button
          isPrimary: true
        }
    }
  ];
//#endregion


  // Esta funcion obtiene las solicitudes del Solicitante
  onGetOrdenesCompra(): void {
    this.openLoading();
    this.servOC.getOrdenCompraAbastecimiento().subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No existen Ordenes de Compra!', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las Ordenes de Compra!', 1000, 'red');
      }
    );
  }

  // Funcion que verifica si existen ordenes que no hay sido sincronizadas con el SAP
  onVerificaEstadoTransferenciaOC(): void {
    // debugger;
    this.openLoading();
    this.servOC.getVerificaEstadoTransferenciaOC().subscribe(
      data => {
        this.closeLoading();
        if (data['result'] == true) {
          this.transferencia = true;
        } else {
          this.transferencia = false;
        }
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al verificar el estado de transferencia de las Ordenes de Compra!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion obtiene una solicitud por su codigo
  onOpenOrden(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/detailoc/' + codigo_orden]);
    // alert(codigo_solicitud);
  }

  irAConversaciones(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/notify/' + codigo_orden]);
  }


  // Esta funcion te envia al formulario de Nueva Orden de Compra
  onOpenAddOrden(codigo_solicitud: string): void {
    // alert(codigo_solicitud);
    this.router.navigate(['/sc/orden/add/' + codigo_solicitud]);
  }

  // Opciones para filtrado de Listado

  onLoadListado() {
    this.openLoading();
    this.lorden = [];
    this.servOC.getListadoOrdenXEstadoSG(this.estado_autorizacion_subgerencia).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  //#region Funciones para anular la solicitud
  onLoadAnularOrden(codigo_orden: string): void {
    this.aorden = new RequestAnulacionSolicitud();
    this.aorden.codigo_solicitud = codigo_orden;
    this.aorden.usuario_anulacion = localStorage.getItem('username');
    // this.onGuardarAnularOrden();
  }

  onGuardarAnularOrden() {
    this.openLoading();
    this.servOC.saveAnularOrden(this.aorden).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se anulo la orden!', 1000, 'green');
        this.estado_autorizacion_subgerencia = 'T';
        this.onLoadListado();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al anular la orden. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  // Funcion para generar los archivos que se subiran al SAP
  generarArchivosSubidaSAP() {
    this.openLoading();
    this.servOC.generarArchivosParaSAP().subscribe(
      data => {
        this.closeLoading();
        this.lopor = data['body'];
        this.numero_sincronizadas = data['length'];
        this.toast.show('Se Genero los archivos correctamente!', 1000, 'green');
        // this.onLoadListado();
        this.ejDialog.show();
        this.onGetOrdenesCompra();
        this.onVerificaEstadoTransferenciaOC();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al crear los archivos. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  actualizarListado() {
    this.onLoadListado();
    // this.onGetOrdenesCompra();
    this.onVerificaEstadoTransferenciaOC();
  }
  // Funciones Loading
  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
}
