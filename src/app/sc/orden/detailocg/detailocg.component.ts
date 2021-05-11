import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../../globals';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { MzModalComponent, MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { OCOrdenCompra, OCTipoCompraEncargado } from '../orden';
import { DetalleOrden } from '../detalleorden';
import { DetalleSolicitud, RequestUpdateDetalleSolicitud } from '../../solicitud/detallesolicitud';
import { SolicitudCompra, RequestAnulacionSolicitud, RequestAutorizacionSolicitud } from '../../solicitud/solicitud';
import { Proveedorsc } from '../../proveedorsc';
import { ItemArticuloSc } from '../../itemarticulosc';
import { Comunes } from '../../../comunes';
import { UsersService } from '../../../admin-intranet/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../../../admin-intranet/users/users';
import { AdjuntoOrdenCompra } from '../adjunto_orden_compra';

@Component({
  selector: 'app-detailocg',
  templateUrl: './detailocg.component.html',
  styleUrls: ['./detailocg.component.scss'],
})
export class DetailocgComponent implements OnInit {
  //#region 
  @ViewChild('ModalAddAdjuntos') modalAdjuntos: MzModalComponent;
  ladjuntooc: Array<AdjuntoOrdenCompra> = new Array<AdjuntoOrdenCompra>();
  //#endregion
  
  // Anulacion de Orden de Compra
    aorden: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();

  // Autorización de Orden de Compra
    autorizarorden: RequestAutorizacionSolicitud = new RequestAutorizacionSolicitud();

    codigo_orden: string = '';
    codigo_solicitud: string = '';
    modificar: Boolean;

    errorMessagesSolicitud = {
    };

    //#region Opciones Calendario
    public opcionesDatePicker: Pickadate.DateOptions = {
      clear: 'Limpiar', // Clear button text
      close: 'OK',    // Ok button text
      today: 'HOY', // Today button text
      closeOnClear: true,
      closeOnSelect: false,
      format: 'yyyy-mm-dd', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
      formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
      // onClose: () => alert('Close has been invoked.'),
      // onOpen: () => alert('Open has been invoked.'),
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 0,    // Creates a dropdown of 10 years to control year,
    };
    //#endregion
    solicitud: SolicitudCompra = new SolicitudCompra();
    proveedores: Array<Proveedorsc> = new Array<Proveedorsc>();
    articulos: Array<ItemArticuloSc> = new Array<ItemArticuloSc>();

    // Variables para detalle de Solicitud
    detallesolicitud: DetalleSolicitud = new DetalleSolicitud(); // OBJETO ARTICULOS
    detallesolicitudservicio: DetalleSolicitud = new DetalleSolicitud(); // OBJETO SERVICIOS
    ldetallesolicitud: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle articulos
    ldetallesolicitudservicio: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle servicios

    numero_item: number;

    // Variables de Ordenes de Compra
    orden: OCOrdenCompra = new OCOrdenCompra();
    lencargados: Array<OCTipoCompraEncargado> = new Array<OCTipoCompraEncargado>();
    camposdeshabilitados: Boolean;

    // End Variables de Ordenes de Compra
    //#region Variables de Detalle de Orden de Compra
    ldetalleordenA: Array<DetalleOrden> = new Array<DetalleOrden>();
    ldetalleordenS: Array<DetalleOrden> = new Array<DetalleOrden>();
    //#endregion

    //#region VARIABLES AGREGAR ARTICULOS O SERVICIOS
    addarraydetalle: DetalleSolicitud[] = [];
    search_codigo_solicitud: string = '';

    tipo_moneda: string = '';
    constructor(
        private comunes: Comunes,
        private global: Globals,
        private servSC: SolicitudService,
        private servOC: OrdenService,
        private toast: MzToastService,
        private servUsers: UsersService,
        private router: Router, private route: ActivatedRoute) {
            this.route.params.subscribe(params => {
            this.codigo_orden = params['id'].toString();
            // this.onLoadUser(atob(this.username));
            });
            this.modificar = true;
    }

    // Variables para editar cantidad
    EditRowID: any = '';
    Edit(val) {
        this.EditRowID = val;
        this.calculaTotal();
    }

    ngOnInit() {
        this.camposdeshabilitados = true;
        this.openLoading();
        this.onGeneraCodigo();
        this.onGetProveedores();
        this.onGetItemArticulo();
        this.onGetOrdenCompra();
    }

    //#region MODAL ADJUNTOS
    openModalAdjutos(){
      this.modalAdjuntos.openModal();
      this.getAdjuntosOrdenCompra();
      // this.modalService.open(OcModalAdjuntosComponent);
    }
    
    // Ultimo Proveedor
    getAdjuntosOrdenCompra(): void {
      this.openLoading();
      this.ladjuntooc = [];

      this.servOC.obtenerAdjuntosOrdenCompra(this.codigo_orden).subscribe(
        (data: Array<AdjuntoOrdenCompra>) => {
          this.closeLoading();
          this.ladjuntooc = data;
        },
        (err: HttpErrorResponse) => {
          this.closeLoading();
          this.toast.show('No se pudo traer la lista de adjuntos de la orden de compra!', 500, 'red');
        }
      );
    }
    // Descargar adjunto
    descargarAdjunto(nombre_archivo: String){
      window.open(this.global.urlAPICORE + 'scfilesordencompra/' + nombre_archivo.replace('.', '|') + '_' + this.codigo_orden); 
    }
//#endregion

    onDirigirConversacion() {
        this.router.navigate(['sc/orden/notify/' + this.codigo_orden]);
    }

    calculaTotal() {
        let sub_total: number = 0;
        let total: number = 0;
        if (this.orden.tipo_orden == 'I') {
          this.ldetalleordenA.forEach(element => {
            sub_total = element.cantidad * element.precio_unitario;
            total = total + sub_total;
          });
          // this.orden.monto_total = total;
          this.orden.monto_sin_desc = total;
          this.calculaTotalConDescuento();
        } else {
          this.ldetalleordenS.forEach(element => {
            sub_total = element.sub_total;
            total = total + sub_total;
          });
          // this.orden.monto_total = total;
          this.orden.monto_sin_desc = total;
          this.calculaTotalConDescuento();
        }
    }

    // Funcion que permite generar un Código Aleatorio
    onGeneraCodigo() {
        let timestamp = + new Date;
        this.orden.codigo_orden = timestamp.toString();
        // alert(this.orden.codigo_orden);
    }

    // Funcion para obtener proveedores
    onGetProveedores(): void {
        this.servSC.getProveedoresSC().subscribe(
        data => {
            this.proveedores = data['body'];
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            // console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.toast.show('Ocurrio un error al obtener los proveedores!', 1000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
    }

    // Funcion para obtener Item de Tipo Articulo
    onGetItemArticulo(): void {
        this.servSC.getItemArticuloSC('ALL').subscribe(
        data => {
            this.closeLoading();
            this.articulos = data['body'];
            // this.toast.show('Se obtuvieron' + data['length'].toString() + ' articulos correctamente!', 1000, 'green');
            // console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener los articulos!', 1000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio : ${err.status}, body was: ${err.error}`);
            }
        }
        );
    }

    OnLoadDatosProveedor($event): void {
        this.orden.nombre_proveedor = $event['CardName'];
        this.orden.codigo_proveedor = $event['CardCode'];

        // // console.log($event);
        // // console.log(this.solicitud);
    }

    OnLoadDatosArticulo($event): void {
        // console.log($event);
        this.detallesolicitud.codigo_item = $event['ItemCode'];
        this.detallesolicitud.descripcion_item = $event['ItemName'];
        this.detallesolicitud.unidad = $event['BuyUnitMsr'];
    }

    onLoadTipoCompraEncargado(): void {
        this.openLoading();
        this.servOC.getTipoOrdenCompraEncargado().subscribe(
          data => {
            this.closeLoading();
            this.lencargados = data['body'];
            this.onLoadEncargadoCompra(this.orden.tipo_compra);
            // this.orden.nombre_encargado_compra = usuario.first_name + ' ' + usuario.last_name;
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del Encargado, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              // console.log('Ocurrio un error:', err.error.message);
            } else {
              // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    onLoadEncargadoCompra(codigo: string): void {
        let encargado: OCTipoCompraEncargado = new OCTipoCompraEncargado();
        this.openLoading();
        this.servOC.getTipoOrdenCompraEncargadoSingle(codigo).subscribe(
          data => {
            this.closeLoading();
            encargado = data['body'];
            this.orden.encargado_compra = encargado.username;
            this.orden.nombre_encargado_compra = encargado.nombre_encargado;
            // this.orden.nombre_encargado_compra = usuario.first_name + ' ' + usuario.last_name;
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del Encargado, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              // console.log('Ocurrio un error:', err.error.message);
            } else {
              // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    updateEstadoDetalleSolicitud(request: RequestUpdateDetalleSolicitud) {
        this.servSC.updateEstadoDetalleSolicitud(request).subscribe(
          data => {
            this.closeLoading();
            // console.log(data);
            // this.toast.show('Se guardo correctamente el detalle de la orden!', 1000, 'green');
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo cambiar el estado del detalle de la solicitud, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              // console.log('Ocurrio un error:', err.error.message);
            } else {
              // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    onLoadUsuarioForUsername(username: string): void {
        this.openLoading();
        let usuario = new Users();
        this.servUsers.getUser(username).subscribe(
          data => {
            this.closeLoading();
            usuario = data['body'][0];
            this.orden.nombre_solicitante = usuario.first_name + ' ' + usuario.last_name;
            if (usuario.id_regional == '11') {
              this.orden.autorizador_sub = 'mzeballos';
            }else {
              this.orden.autorizador_sub = 'jocampod';
            }
            this.orden.autorizador_gerencia = 'jocampod';
          },
          (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('No se pudo obtener información del solicitante, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              // console.log('Ocurrio un error:', err.error.message);
            } else {
              // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    //#region ENCARGADOS
    selectEncargado() {
        this.onLoadEncargadoCompra(this.orden.tipo_compra);
        // this.orden.encargado_compra = encargado;

        // this.onLoadEncargadoForUsername(usernameE);
        // alert(usernameE);
        // console.log(this.orden.tipo_compra);
    }

    // Funcion para obtener la orden de compra
    onGetOrdenCompra(): void {
        this.servOC.getOrdenXCodigo(this.codigo_orden).subscribe(
        data => {
            this.closeLoading();
            this.onGetDetalleOrdenCompra();
            this.orden = data['body'];
            this.onLoadUsuarioForUsername(this.orden.solicitante);
            this.onLoadTipoCompraEncargado();
            this.onLoadAnularOrden(this.codigo_orden);
            this.ObtenerProveedorSolicitud(this.orden.codigo_proveedor);
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            // console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener la orden de compra!', 5000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
    }

    ObtenerProveedorSolicitud(codigo_proveedor: string): void {
      this.openLoading();
      this.servSC.getProveedoresPorCodigo(codigo_proveedor).subscribe(
        data => {
          this.closeLoading();
          this.tipo_moneda = data['body'][0]['Currency'];
          // alert(this.tipo_moneda);
          // this.toast.show('Se obtuvieron' + data['length'].toString() + ' articulos correctamente!', 1000, 'green');
          // console.log(data);
        },
        (err: HttpErrorResponse) => {
          this.closeLoading();
          this.toast.show('Ocurrio un error al obtener los articulos!', 1000, 'red');
          if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // console.log(`El servidor respondio : ${err.status}, body was: ${err.error}`);
          }
        }
      );
    }

    onGetDetalleOrdenCompra(): void {
        this.openLoading();
        this.servOC.getDetalleOrdenXCodigo(this.codigo_orden).subscribe(
        data => {
            this.closeLoading();
            if (this.orden.tipo_orden == 'I') {
                this.ldetalleordenA = data['body'];
            } else {
                this.ldetalleordenS = data['body'];
            }
            // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
            // console.log(data);
        },
        (err: HttpErrorResponse) => {
            this.closeLoading();
            this.toast.show('Ocurrio un error al obtener la orden de compra!', 5000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        });
    }


    //#region EDITAR ORDEN DE COMPRA
    onEditar(): void {
        this.modificar = false;
    }

    onCancelarEdicion(): void {
        this.modificar = true;
    }
    //#endregion

    //#region MODIFICAR ORDEN DE COMPRA
    onModificarOrdenCompra(): void {
        this.onEliminarOrdenCompra();
    }

    onEliminarOrdenCompra(): void {
        debugger;
        this.openLoading();
        this.servOC.eliminaOrdenCompra(this.orden.codigo_orden + '_' + localStorage.getItem('username')).subscribe(
          data => {
            this.closeLoading();
          // this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
            this.onSaveOrdenCompra(this.orden);
            // console.log(data);
          },
          (err: HttpErrorResponse) => {
              this.closeLoading();
            this.toast.show('No se modifico, ocurrio un error!', 1000, 'red');
            if (err.error instanceof Error) {
              // console.log('Ocurrio un error:', err.error.message);
            } else {
              // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
        );
    }

    onSaveOrdenCompra(o: OCOrdenCompra): void {
        this.openLoading();
        this.orden.usuario_modificacion = localStorage.getItem('username');
        this.servOC.editOrdenCompra(o).subscribe(
            data => {
                this.closeLoading();
                if (this.orden.tipo_orden == 'I') {
                    this.onSaveDetalleOrdenCompra(this.ldetalleordenA);
                } else {
                    this.onSaveDetalleOrdenCompra(this.ldetalleordenS);
                }
                this.toast.show('Se modifo la orden correctamente!', 250, 'green', () => { this.router.navigate(['/sc/orden/list']); });
            },
            (err: HttpErrorResponse) => {
                this.closeLoading();
              this.toast.show('No se guardo los cambios, ocurrio un error!', 1000, 'red');
              if (err.error instanceof Error) {
                // console.log('Ocurrio un error:', err.error.message);
              } else {
                // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
              }
            }
        );
    }

    onQuitarDetalleOrdenCompra(doc: DetalleOrden) {
      if (this.orden.tipo_orden == 'I') {
        if (this.ldetalleordenA.find(x => x == doc)) { this.ldetalleordenA.splice(this.ldetalleordenA.indexOf(doc), 1); }
      } else {
        if (this.ldetalleordenS.find(x => x == doc)) { this.ldetalleordenS.splice(this.ldetalleordenS.indexOf(doc), 1); }
      }
    }

    onSaveDetalleOrdenCompra(ldetalle: Array<DetalleOrden>) {
        this.openLoading();
        let detalle: DetalleOrden = new DetalleOrden();
        let requestDS: RequestUpdateDetalleSolicitud = new RequestUpdateDetalleSolicitud();
        ldetalle.forEach(element => {
          detalle = new DetalleOrden();
          detalle = element;
          detalle.usuario_modificacion = localStorage.getItem('username');

          if (detalle.tipo_item == 'I') {
            detalle.sub_total = detalle.cantidad * detalle.precio_unitario;
          }

          requestDS = new RequestUpdateDetalleSolicitud();
          requestDS.codigo_solicitud = detalle.codigo_solicitud;
          requestDS.id_detalle_solicitud = detalle.id_detalle_solicitud;
          requestDS.usuario_modificacion = localStorage.getItem('username');
          requestDS.estado  = 'X'; // Cambia el estado de A a X que indica que ya se tomo en cuenta en una orden de compra
          this.servOC.editDetalleOrdenCompra(detalle).subscribe(
            data => {
              this.closeLoading();
              // console.log(data);
              this.updateEstadoDetalleSolicitud(requestDS);
              // this.toast.show('Se guardo correctamente el detalle de la orden!', 1000, 'green');
            },
            (err: HttpErrorResponse) => {
              this.closeLoading();
              this.toast.show('No se guardo el detalle de la orden de compra, ocurrio un error!', 1000, 'red');
              if (err.error instanceof Error) {
                // console.log('Ocurrio un error:', err.error.message);
              } else {
                // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
              }
            }
          );
        });
    }
    //#endregion

  //#region Funciones para anular la solicitud
  onLoadAnularOrden(codigo_solicitud: string): void {
    this.aorden = new RequestAnulacionSolicitud();
    this.aorden.codigo_solicitud = this.orden.codigo_orden;
    this.aorden.usuario_anulacion = localStorage.getItem('username');
  }

  onGuardarAnularOrden() {
    this.servOC.saveAnularOrden(this.aorden).subscribe(
      data => {
        this.toast.show('Se anulo la orden!', 1000, 'green');
        this.router.navigate(['/sc/orden/list']);
      },
      (err: HttpErrorResponse) => {
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

  //#region AGREGAR NUEVOS ARTICULOS DE OTRA SOLICITUD
  onSeleccionaItemArticulo(ds: DetalleSolicitud) {
    if (this.addarraydetalle.find(x => x == ds)) {
      this.addarraydetalle.splice(this.addarraydetalle.indexOf(ds), 1);
    } else {
      this.addarraydetalle.push(ds);
    }
    // console.log(this.addarraydetalle);
  }

  AddOrden(accion: string) {
    if (accion == 'C') {
      this.addarraydetalle = [];
    } else {
      this.addarraydetalle.forEach(element => {
        let dorden: DetalleOrden = new DetalleOrden();

        this.numero_item = this.numero_item + 1;
        dorden.id_detalle_solicitud = element.id_detalle_solicitud;
        dorden.codigo_solicitud = element.codigo_solicitud;
        dorden.codigo_orden = this.orden.codigo_orden;
        dorden.codigo_item = element.codigo_item;
        dorden.descripcion_item = element.descripcion_item;
        dorden.tipo_item = element.tipo_item;
        dorden.fecha_arte = element.fecha_arte;
        dorden.fecha_requerida = element.fecha_requerida;
        dorden.cantidad = element.cantidad;
        dorden.unidad = element.unidad;
        dorden.precio_unitario = 0;
        dorden.sub_total = dorden.cantidad * dorden.precio_unitario;
        dorden.estado = 'A';
        dorden.prioridad = this.numero_item;

        dorden.usuario_creacion = localStorage.getItem('username');
        dorden.usuario_modificacion = localStorage.getItem('username');
        if (element.tipo_item == 'S') {
          this.ldetalleordenS.push(dorden);
        } else {
          this.ldetalleordenA.push(dorden);
        }
      });
    }
  }

  OpenAddDetalleOrden(tipo: string) {
    this.search_codigo_solicitud = '';
    this.addarraydetalle = [];
    if (tipo == 'I') {
      this.ldetallesolicitud = [];
    } else {
      this.ldetallesolicitudservicio = [];
    }
  }

  buscarSolicitud() {
    this.openLoading();
    this.servSC.getDetalleSolicitudXCodigo(this.search_codigo_solicitud).subscribe(
      data => {
        this.closeLoading();
        this.ldetallesolicitud = data['body'];
        this.ldetallesolicitudservicio = data['body'];
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('No se pudo traer los Items de esta solicitud, intente nuevamente!', 500, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion


  //#region AUTORIZACION SUG_GERENCIA
  onLoadAutorizarOrden(codigo_orden: string, estado_autorizacion_subgerencia: string): void {
    this.autorizarorden = new RequestAutorizacionSolicitud();
    this.autorizarorden.codigo_solicitud = codigo_orden;
    this.autorizarorden.autorizador = localStorage.getItem('username');
    this.autorizarorden.estado_autorizacion = estado_autorizacion_subgerencia;
    // this.onGuardarAutorizarSolicitud(estado_autorizacion_superior);
  }

  onLoadAprobarOrden(codigo_orden: string, estado_autorizacion_subgerencia: string): void {
    this.autorizarorden = new RequestAutorizacionSolicitud();
    this.autorizarorden.codigo_solicitud = codigo_orden;
    this.autorizarorden.autorizador = localStorage.getItem('username');
    this.autorizarorden.estado_autorizacion = estado_autorizacion_subgerencia;
    this.onGuardarAutorizarSGOrden();
  }

  onGuardarAutorizarSGOrden() {
    this.openLoading();
    let tipo_autorizacion: string = '';
    if (this.autorizarorden.estado_autorizacion == 'A') {
      tipo_autorizacion = 'aprobar';
    } else {
      tipo_autorizacion = 'rechazar';
    }
    this.servOC.saveAutorizarOrdenG(this.autorizarorden).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se ' + tipo_autorizacion + ' la orden de compra!', 500, 'green');
        this.router.navigate(['/sc/orden/list_g']);
        // this.onGetOrdenesCompra();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al ' + tipo_autorizacion + ' la orden de compra. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  // Funciones Loading
  openLoading() {
      const loading = $('#loading');
      loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }

  calculaTotalConDescuento() {

    if (this.orden.descuento == null) {
      this.orden.descuento = 0;
    }
    console.log('descuento :>> ', this.orden.descuento);
    const descuentox = (this.orden.descuento / 100) * this.orden.monto_sin_desc;
      this.orden.monto_total = this.orden.monto_sin_desc - descuentox;

  }
}
