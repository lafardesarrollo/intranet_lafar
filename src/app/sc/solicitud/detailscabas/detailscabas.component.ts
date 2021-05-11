import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SolicitudCompra, RequestAnulacionSolicitud, RequestAutorizacionSolicitud, RequestFechaArte, FechaArte,
  RequestCerrarSolicitud } from '../solicitud';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedorsc } from '../../proveedorsc';
import { DetalleSolicitud } from '../detallesolicitud';
import { ItemArticuloSc } from '../../itemarticulosc';
import { FormGroup } from '@angular/forms';
import { SCFile } from '../../scfile';
import { Globals } from '../../../globals';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, detach, enableRipple } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from 'util';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { DepartamentoCompra } from '../models/departamento-compra.model';


@Component({
  selector: 'app-detailscabas',
  templateUrl: './detailscabas.component.html',
  styleUrls: ['./detailscabas.component.scss'],
})
export class DetailscabasComponent implements OnInit {
// ........................................... AQUI COMIENZA NUEVO DIALOG .............................
@ViewChild('ejDialog') ejDialog: DialogComponent;
// The Dialog shows within the target element.
@ViewChild('container', { read: ElementRef }) container: ElementRef;
// The Dialog shows within the target element.
public targetElement: HTMLElement;

public fields: Object = { text: 'Descripcion', id: 'ItemCode' };
@ViewChild('list') listObj: ListViewComponent;
@ViewChild('textbox')textboxEle: any;

// ...................................... END NUEVO DIALOG ............................................

// Fecha de Arte
  view_fecha_arte: Boolean = true;
  disabled_fecha_arte: Boolean = true;

// Anulacion de Solicitud
  asolicitud: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();
// Autorizar Aprobar o Rechazar solicitud
  autorizarsolcitud: RequestAutorizacionSolicitud = new RequestAutorizacionSolicitud();

//#region VARIABLES PARA MODIFICACIÓN
  modificar: Boolean = false;
//#endregion

  codigo_solicitud: string;
  // Variables para subir archivos
  myFiles: string [] = [];
  public lfiles: Array<SCFile> = new Array<SCFile>(); // Lista de Archivos que fueron subidos
  departamentos: Array<DepartamentoCompra> = new Array<DepartamentoCompra>();
//#region VARIABLES DE VALIDACIÓN
  @ViewChild('form') form: FormGroup;
  submitted = false;

  errorMessagesSolicitud = {
    tipo: {
        required: 'Seleccione el Tipo'
    },
    fecha: {
        required: 'Seleccione la Fecha'
    },
    motivo: {
        required: 'Ingrese un Motivo'
    },
    tipo_compra: {
        required: 'Ingrese el tipo de Compra'
    },

    fecha_requerida: {
      required: 'Seleccione la fecha'
    },

    fecha_requerida_servicio: {
      required: 'Seleccione la fecha requerida'
    },

    cantidad:  {
      required: 'Seleccione la fecha'
    },

    s_descripcion: {
      required: 'Ingrese la descripción del servicio'
    },

    departamento_compra: {
      required: 'Seleccione este Campo'
    }
  };

//#endregion

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

  public botonSave: Boolean = true;
  tipo_solicitud: string;
  solicitud: SolicitudCompra = new SolicitudCompra();
  proveedores: Array<Proveedorsc> = new Array<Proveedorsc>();
  articulos: any; // Array<ItemArticuloSc> = new Array<ItemArticuloSc>();

  // Variables para detalle de Solicitud
  detallesolicitud: DetalleSolicitud = new DetalleSolicitud(); // OBJETO ARTICULOS
  detallesolicitudservicio: DetalleSolicitud = new DetalleSolicitud(); // OBJETO SERVICIOS
  ldetallesolicitud: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle articulos
  ldetallesolicitudservicio: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle servicios

  numero_item: number;
  constructor(
    private global: Globals,
    private servSC: SolicitudService,
    private toast: MzToastService,
    private router: Router, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.codigo_solicitud = params['id'].toString();
        // this.onLoadUser(atob(this.username));
    });
    this.modificar = false;
  }

   // Variables para agregar detalle

  // Variables para editar cantidad
  EditRowID: any = '';
  Edit(val) {
    this.EditRowID = val;
  }

  ngOnInit() {
    this.initilaizeTarget();
    this.openLoading();
    this.onGeneraCodigo();
    this.onGetProveedores();
    this.onGetItemArticulo();
    this.onGetDepartamentoCompra();
    this.solicitud.tipo = 'I';
    this.onLoadSolicitudCompra(this.codigo_solicitud);
    // this.onLoadDetalleSolicitudCompra();
    this.onLoadListaDetalleSolicitud();
    this.onLimpiaListaDetalleSolicitud();
    this.onValoresPorDefecto();
    // alert(localStorage.getItem('id_superior'));
    // alert(localStorage.getItem('username'));

  // Variables para subir archivos
    this.modificar = false;
  }

  // Funcion para obtener departamentos para la compra
  onGetDepartamentoCompra(): void {
    this.openLoading();
    this.servSC.getDepartamentoCompra().subscribe(
      data => {
        this.closeLoading();
        this.departamentos = data;
        // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' proveedores correctamente!', 1000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onValoresPorDefecto() {
    this.detallesolicitud.fecha_arte = new Date('1990-01-01');
    this.detallesolicitudservicio.fecha_arte = new Date('1990-01-01');
  }

  onLoadSolicitudCompra(codigo: string) {
    this.servSC.getSolicitudXCodigo(codigo).subscribe(
        data => {
            this.solicitud = data['body'];
            this.onLoadDetalleSolicitudCompra(codigo);
            this.onGetUploadFilesSolicitud(codigo);
            this.onLoadAnularSolicitud(codigo);
            this.onLoadAutorizarSolicitud(codigo);
        },
        (err: HttpErrorResponse) => {
            this.toast.show('No se obtuvo ninguna solicitud, Ocurrio un error!', 3000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        }
    );
  }

  onLoadDetalleSolicitudCompra(codigo: string) {
    this.servSC.getDetalleSolicitudXCodigo(codigo).subscribe(
        data => {
            this.ldetallesolicitud = data['body'];
            this.ldetallesolicitudservicio = data['body'];
            this.numero_item = data['length'];
        },
        (err: HttpErrorResponse) => {
            this.toast.show('No se pudo traer el detalle de esta solicitud, intente nuevamente!', 3000, 'red');
            if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
            } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
        }
    );
  }

// Funcion para Eliminar Solicitud por Codigo
  onEliminarSolicitudCompra(): void {
    this.servSC.eliminaSolicitudCompra(this.codigo_solicitud).subscribe(
      data => {
      // this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
        this.onSaveSolicitudCompraModificar(this.solicitud);
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se modifico, ocurrio un error!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
// Funcion para Modificar la Cabecera de la solicitud
  onSaveSolicitudCompraModificar(s: SolicitudCompra): void {
    s.usuario_modificacion = localStorage.getItem('username');
    this.servSC.editarSolicitudCompra(s).subscribe(
        data => {
          if (data['status'] == 304) {
              this.toast.show('No se modifico, revise la información', 1000, 'red');
              this.botonSave = true;
          } else {
              if (s.tipo == 'I') {
                this.ldetallesolicitud.forEach(element => {
                  this.detallesolicitud = new DetalleSolicitud();
                  this.detallesolicitud = element;
                  this.detallesolicitud.codigo_solicitud = s.codigo;
                  this.detallesolicitud.estado = 'A';
                  this.detallesolicitud.tipo_item = s.tipo;
                  this.onSaveDetalleSolicitudCompra(this.detallesolicitud);
                });
                this.toast.show('Se modifico correctamente!', 1000, 'green', () => this.router.navigate(['/sc/solicitud/list_abast/']));
              } else {
                this.ldetallesolicitudservicio.forEach(element => {
                  this.detallesolicitudservicio = new DetalleSolicitud();
                  this.detallesolicitudservicio = element;
                  this.detallesolicitudservicio.codigo_solicitud = s.codigo;
                  this.detallesolicitudservicio.estado = 'A';
                  this.detallesolicitudservicio.tipo_item = s.tipo;
                  this.onSaveDetalleSolicitudCompra(this.detallesolicitudservicio);
                });
                this.toast.show('Se modifico correctamente!', 1000, 'green', () => this.router.navigate(['/sc/solicitud/list_abast/']));
              }
              this.onSaveUploadFilesSolicitud(this.lfiles, this.solicitud.codigo);
          }
        // this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se modifico, ocurrio un error!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onValidaCabeceraSolicitudModificar() {
    if (this.solicitud.tipo == 'I') {
      if (this.ldetallesolicitud.length > 0) { // Valida si existen items agregados en la solicitud
        // this.toast.show('Guardando' + this.solicitud.codigo, 1000, 'green');
        this.onEliminarSolicitudCompra();
      }else {
        this.toast.show('No existen Items agregados a la solicitud ' + this.solicitud.codigo, 1000, 'red');
      }
    } else {
      if (this.ldetallesolicitudservicio.length > 0) { // Valida si existen items agregados en la solicitud
        // this.toast.show('Guardando' + this.solicitud.codigo, 1000, 'green');
        this.onEliminarSolicitudCompra();
      }else {
        this.toast.show('No existen Items agregados a la solicitud ' + this.solicitud.codigo, 1000, 'red');
      }
    }
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
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
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
        this.toast.show('Ocurrio un error al obtener los proveedores!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio : ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  OnLoadDatosProveedor($event): void {
    this.solicitud.nombre_proveedor = $event['CardName'];
    this.solicitud.codigo_proveedor = $event['CardCode'];

    // console.log($event);
    // console.log(this.solicitud);
  }

  onLoadFechaArte(codigo_producto: string, codigo_proveedor: string) {
    let request: RequestFechaArte = new RequestFechaArte();
    let fecha_arte: FechaArte = new FechaArte();
    request.codigo_producto = codigo_producto;
    request.codigo_proveedor = codigo_proveedor;
    this.servSC.getFechaArte(request).subscribe(
      data => {
        if (data['result']) {
          fecha_arte = data['body'];
          this.detallesolicitud.fecha_arte = new Date(fecha_arte.U_u_fechaarte);
          this.view_fecha_arte = true;
          // console.log(fecha_arte);
        } else {
          this.view_fecha_arte = false;
          this.detallesolicitud.fecha_arte = new Date('1990-01-01');
          this.toast.show('Este producto no cuenta con una fecha de arte', 2000, 'red');
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.show('La fecha de arte no se cargo correctamente intentenuevamente!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  // Funciones para Detalle de la Solicitud
  onLimpiaListaDetalleSolicitud(): void {
    this.ldetallesolicitud = new Array<DetalleSolicitud>();
    this.detallesolicitud = new DetalleSolicitud();
    this.numero_item = 0;
    this.onValoresPorDefecto();
  }

  onSaveDetalleSolicitudCompra(ds: DetalleSolicitud): void {
    this.servSC.saveDetalleSolicitudCompra(ds).subscribe(
      data => {
        // this.toast.show('Se guardo correctamente DS!', 3000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se guardo DS!', 3000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  /*onLoadDetalleSolicitudCompra(): void {
    this.detallesolicitud.codigo_solicitud = 'SCA0001';
    this.detallesolicitud.codigo_item = 'CC010054';
    this.detallesolicitud.descripcion_item = 'DES01';
    this.detallesolicitud.tipo_item = 'I';
    this.detallesolicitud.fecha_arte = new Date('2018-11-28');
    this.detallesolicitud.fecha_requerida = new Date('2018-11-27');
    this.detallesolicitud.cantidad = 3;
    this.detallesolicitud.unidad = 'Kg';
    this.detallesolicitud.prioridad = 0;
    this.detallesolicitud.estado = 'A';
    this.detallesolicitud.usuario_creacion = 'faruni';
    this.detallesolicitud.fecha_creacion = new Date('2018-11-27');
    this.detallesolicitud.usuario_modificacion = 'faruni';
    this.detallesolicitud.fecha_modificacion = new Date('2018-11-27');
  }*/

  onLoadListaDetalleSolicitud(): void {
    this.ldetallesolicitud = new Array<DetalleSolicitud>();
  }

  onAddItemSolicitud() {
    this.numero_item = this.numero_item + 1;
    this.detallesolicitud.prioridad =  this.numero_item;
    this.detallesolicitud.estado = 'S';
    this.detallesolicitud.usuario_creacion = localStorage.getItem('username');
    this.detallesolicitud.fecha_creacion = new Date('2018-11-27'); // Estos datos solo son para envio ya que se cambian en el servicio
    this.detallesolicitud.usuario_modificacion = localStorage.getItem('username');
    this.detallesolicitud.fecha_modificacion = new Date('2018-11-27'); // Estos datos solo son para envio ya que se cambian en el servicio
    this.ldetallesolicitud.push(this.detallesolicitud);
    this.detallesolicitud = new DetalleSolicitud();
    this.onValoresPorDefecto();
  }

  onAddServicioSolicitud() {
    this.numero_item = this.numero_item + 1;
    this.detallesolicitudservicio.codigo_item = this.numero_item.toString();
    this.detallesolicitudservicio.prioridad =  this.numero_item;
    this.detallesolicitudservicio.estado = 'S';
    this.detallesolicitudservicio.fecha_arte = new Date('1990-01-01');
    this.detallesolicitudservicio.usuario_creacion = localStorage.getItem('username');
    this.detallesolicitudservicio.fecha_creacion = new Date('2018-11-27'); // se cambian en el servicio
    this.detallesolicitudservicio.usuario_modificacion = localStorage.getItem('username');
    this.detallesolicitudservicio.fecha_modificacion = new Date('2018-11-27'); // se cambian en el servicio
    this.ldetallesolicitudservicio.push(this.detallesolicitudservicio);
    this.detallesolicitudservicio = new DetalleSolicitud();
  }

  onQuitarItemSolicitud(item: DetalleSolicitud) {
    if (item.tipo_item == 'S') {
      if (this.ldetallesolicitudservicio.find(x => x == item)) {
        this.ldetallesolicitudservicio.splice(this.ldetallesolicitudservicio.indexOf(item), 1);
      }
    }else {
      if (this.ldetallesolicitud.find(x => x == item)) {
      this.ldetallesolicitud.splice(this.ldetallesolicitud.indexOf(item), 1);
      }
    }
  }

  onGeneraCodigo() {
    let timestamp = + new Date;
    this.solicitud.codigo = timestamp.toString();
  }

  /* Funcion autogenerado por tiempo
  onGeneraCodigo() {
    let timer = Observable.timer(1000, 500);
    timer.subscribe(t => {
      let timestamp = + new Date;
      this.solicitud.codigo = timestamp.toString();
    });
  }
  */
//#region ARCHIVOS ADJUNTOS --------------------------------------------------------------------------
  // Subir archivos
  getFileDetails (e) {
    // // console.log (e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();

    for (let i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
    }
    this.servSC.uploadFilesSolicitud(frmData).subscribe(
      data => {
        this.lfiles = data['body'];
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.toast.show('Los archivos fueron adjuntos correctamente!', 2000, 'green');
        // console.log (this.lfiles);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al subir los archivos', 2000, 'red');
        // console.log (err.message);    // SHOW ERRORS IF ANY.
      }
    );
  }

  onSaveUploadFilesSolicitud (lf: Array<SCFile>, codigo_solicitud: string): void {
    this.servSC.saveUploadFilesSolicitud(lf, codigo_solicitud).subscribe(
      data => {
        // this.toast.show('Se subio los archivos correctamente!', 2000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('No se guardaron los archivos adjuntos!', 2000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onGetUploadFilesSolicitud (codigo_solicitud: string): void {
    this.servSC.getUploadFilesSolicitud(codigo_solicitud).subscribe(
      data => {
        this.lfiles = data['body'];
        // this.toast.show('Se subio los archivos correctamente!', 2000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los archivos adjuntos a esta solicitud!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  downloadFile(item: SCFile) { // Funcion para descargar el archivo adjunto
    // alert(nombre);
    window.open(this.global.urlAPICORE + 'scfilessolicitudcompra/' + item.NombreGenerico.replace('.', '|') + '~' + item.codigo_solicitud);
  }

  imprimirSolicitud(){
    window.open(this.global.urlAPICORE + 'imprimirsolicitudcompra/' + this.solicitud.codigo);
  }
//#endregion


  //#region MODIFICAR DETALLE ARTICULO -----------------------------------------------------------
  onModificarArticulo(codigo: string) {
    // alert(codigo);
  }
  //#endregion

  //#region EDITAR SOLICITUD
  onEditar(): void {
    this.modificar = true;
  }

  onCancelarEdicion(): void {
    this.modificar = false;
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

  onDirigirConversacion() {
    this.router.navigate(['sc/solicitud/notify/' + this.codigo_solicitud]);
  }

  // Funciones para Anular la Solicitud
  //#region Funciones para anular la solicitud

  onLoadAnularSolicitud(codigo_solicitud: string): void {
    this.asolicitud = new RequestAnulacionSolicitud();
    this.asolicitud.codigo_solicitud = this.solicitud.codigo;
    this.asolicitud.usuario_anulacion = localStorage.getItem('username');
    // this.onGuardarAnularSolicitud();
  }

  onGuardarAnularSolicitud() {
    this.servSC.saveAnularSolicitud(this.asolicitud).subscribe(
      data => {
        this.toast.show('Se anulo la solicitud!', 1000, 'green');
        this.router.navigate(['/sc/solicitud/list_abast']);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al anular la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onLoadAutorizarSolicitud(codigo_solicitud: string): void {
    this.autorizarsolcitud = new RequestAutorizacionSolicitud();
    this.autorizarsolcitud.codigo_solicitud = this.solicitud.codigo;
    this.autorizarsolcitud.autorizador = localStorage.getItem('username');
    // this.onGuardarAnularSolicitud();
  }

  onGuardarAutorizarSolicitud(estado_autorizacion_superior: string) {
    this.autorizarsolcitud.estado_autorizacion = estado_autorizacion_superior;
    let tipo_autorizacion: string = '';
    if (this.autorizarsolcitud.estado_autorizacion == 'A') {
      tipo_autorizacion = 'aprobo';
    } else {
      tipo_autorizacion = 'rechazo';
    }
    this.servSC.saveAutorizarSolicitud(this.autorizarsolcitud).subscribe(
      data => {
        this.toast.show('Se ' + tipo_autorizacion + ' la solicitud!', 1000, 'green');
        this.router.navigate(['/sc/solicitud/list_aut']);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al ' + tipo_autorizacion + ' la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  //#region Cerrar la solicitud
  cerrarSolicitud(codigo_solicitud: string) {
    let request: RequestCerrarSolicitud = new RequestCerrarSolicitud();
    request.usuario_creacion = localStorage.getItem('username');
    request.codigo_solicitud = codigo_solicitud;
    this.servSC.cerrarSolicitudCompra(request).subscribe(
      data => {
        // this.toast.show('Se cerro la solicitud correctamente!', 500, 'green');
        this.router.navigate(['/sc/solicitud/list_abast']);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al cerrar la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // #region NUEVO MODAL DE ITEMS -------------------------------------------------------------------------------------------
  onkeyup(event) {
    let value = this.textboxEle.nativeElement.value;
    let data: any = new DataManager(this.articulos).executeLocal(new Query().where('Descripcion', 'contains', value, true));
    if (!value) {
      this.listObj.dataSource = this.articulos.slice();
    } else {
      this.listObj.dataSource = data;
    }
    this.listObj.dataBind();
  }

  selectItem(e) {
    console.log(e);
    // alert(e.data.ItemCode + '-' + e.data.ItemName);
    this.detallesolicitud.codigo_item  = e.data.ItemCode;
    this.detallesolicitud.descripcion_item = e.data.ItemName;
    this.detallesolicitud.unidad = e.data.BuyUnitMsr;
    this.onLoadFechaArte(this.detallesolicitud.codigo_item, this.solicitud.codigo_proveedor);
    this.hideDialog();
  }

  // #region DIALOG
  public focusIn(target: HTMLElement): void {
    let parent: HTMLElement = target.parentElement;
    if (parent.classList.contains('e-input-in-wrap')) {
        parent.parentElement.classList.add('e-input-focus');
    } else {
        parent.classList.add('e-input-focus');
    }
  }

  public focusOut(target: HTMLElement): void {
    let parent: HTMLElement = target.parentElement;
    if (parent.classList.contains('e-input-in-wrap')) {
        parent.parentElement.classList.remove('e-input-focus');
    } else {
        parent.classList.remove('e-input-focus');
    }
  }
  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  }
  // Enables the footer buttons
  public buttons: Object = [
    {
      'click': this.hideDialog.bind(this),
        buttonModel:{
        content:'Seleccionar',
        isPrimary: true
      }
    }
  ];

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  public validation (event: any): void {
    let text = (<HTMLInputElement>document.getElementById('textvalue'));
    let text1 = (<HTMLInputElement>document.getElementById('textvalue2'));
    if (text.value === '' && text1.value === '') {
        event.cancel = true;
        alert('Enter the username and password');
    } else if (text.value === '') {
        event.cancel = true;
        alert('Enter the username');
    } else if (text1.value === '') {
        event.cancel = true;
        alert('Enter the password');
    } else if (text.value.length < 4) {
        event.cancel = true;
        alert('Username must be minimum 4 characters');
    } else {
        event.cancel = false;
        (<HTMLInputElement>document.getElementById('textvalue')).value = '';
        (<HTMLInputElement>document.getElementById('textvalue2')).value = '';
    }
  }
  // Sample level code to handle the button click action
  public onOpenDialog = function(event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  }
}
