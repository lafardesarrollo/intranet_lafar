import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SolicitudCompra, RequestFechaArte, FechaArte } from '../solicitud';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzModalComponent, MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';
import { Proveedorsc } from '../../proveedorsc';
import { DetalleSolicitud } from '../detallesolicitud';
import { ItemArticuloSc } from '../../itemarticulosc';
import { FormGroup } from '@angular/forms';
import { SCFile } from '../../scfile';
import { Comunes } from '../../../comunes';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, detach, enableRipple } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from 'util';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SelectedEventArgs } from '@syncfusion/ej2-inputs';
import { Globals } from '../../../globals';
import { DepartamentoCompra } from '../models/departamento-compra.model';

@Component({
  selector: 'app-addsc',
  templateUrl: './addsc.component.html',
  styleUrls: ['./addsc.component.scss'],
})
export class AddscComponent implements OnInit {
  @ViewChild('AddItemModal') modalAddItem: MzModalComponent;
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
  modificar: Boolean = false;
  // Fecha de Arte
  view_fecha_arte: Boolean = true;
  existeFechaArte: Boolean = false;
  disabled_fecha_arte: Boolean = true;
  // Variables para subir archivos
  myFiles: string [] = [];
  public lfiles: Array<SCFile> = new Array<SCFile>(); // Lista de Archivos que fueron subidos

//#region VARIABLES DE VALIDACIÓN
  @ViewChild('form') form: FormGroup;
  @ViewChild('filesolicitud') myInputVariable: ElementRef;

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


  @ViewChild('ejDialogupload') ejDialogupload: DialogComponent;
  @ViewChild('containerupload', { read: ElementRef }) containerupload: ElementRef;
  public targetElementupload: HTMLElement;
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

  departamentos: Array<DepartamentoCompra> = new Array<DepartamentoCompra>();
  articulos: any; // Array<ItemArticuloSc> = new Array<ItemArticuloSc>();

  // Variables para detalle de Solicitud
  detallesolicitud: DetalleSolicitud = new DetalleSolicitud(); // OBJETO ARTICULOS
  detallesolicitudservicio: DetalleSolicitud = new DetalleSolicitud(); // OBJETO SERVICIOS
  ldetallesolicitud: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle articulos
  ldetallesolicitudservicio: Array<DetalleSolicitud> = new Array<DetalleSolicitud>(); // lista detalle servicios

  numero_item: number;

  // ---------------------------------------------------------  UPLOAD --------------------------------------------
  public path: Object = {
    saveUrl: this.global.urlAPICORE + 'scfilessolicitudadjunto',
    removeUrl: this.global.urlAPICORE + 'scdeletefilessolicitudcompra' };
    public dropEle: HTMLElement ;

  constructor(
    private global: Globals,
    private servSC: SolicitudService,
    private comunes: Comunes,
    private toast: MzToastService,
    private router: Router) {
      this.solicitud.adjuntos = [];
  }

  public data: string[] = ['Cricket', 'Football', 'Rugby', 'Snooker', 'Tennis'];
   // Variables para agregar detalle

  // Variables para editar cantidad
  EditRowID: any = '';
  Edit(val) {
    this.EditRowID = val;
  }

  ngOnInit() {
    // 
    //  this.initilaizeTarget();
    // this.initilaizeTargetUpload();
    this.dropEle = document.getElementById('droparea');
    this.openLoading();
    this.onGeneraCodigo();
    this.onGetProveedores();
    this.onGetDepartamentoCompra();
    // this.onGetItemArticulo();
    this.solicitud.tipo = 'I';
    this.solicitud.solicitante = localStorage.getItem('username');
    this.solicitud.fecha =  new Date(this.comunes.obtenerFechaYHoraActual());
    // this.onLoadSolicitudCompra();
    // this.onLoadDetalleSolicitudCompra();
    this.onLoadListaDetalleSolicitud();
    this.onLimpiaListaDetalleSolicitud();
    this.onValoresPorDefecto();
    // alert(localStorage.getItem('id_superior'));
    // alert(localStorage.getItem('username'));

  // Variables para subir archivos
    
    this.modificar = false;
  }

  onValoresPorDefecto() {
    this.detallesolicitud.fecha_arte = new Date('1990-01-01');
    this.detallesolicitudservicio.fecha_arte = new Date('1990-01-01');
  }

  onLoadSolicitudCompra() {
    this.solicitud.codigo = 'SCA003';
    this.solicitud.tipo = 'A';
    this.solicitud.estado = 'C';
    this.solicitud.estado_transferencia = 'N';
    this.solicitud.fecha = new Date('2018-11-27');
    this.solicitud.motivo = 'URGENTE';
    this.solicitud.usuario_anulacion = 'NA';
    this.solicitud.motivo_anulacion = 'NA';
    this.solicitud.fecha_anulacion = new Date('2018-11-27');
    this.solicitud.solicitante = 'faruni';
    this.solicitud.autorizador = 'mfloresr';
    this.solicitud.estado_autorizacion_superior = 'P';
    this.solicitud.fecha_autorizacion_superior = new Date('2018-11-27');
    this.solicitud.motivo_autorizacion = 'NA';
    this.solicitud.tipo_compra = 'I';
    this.solicitud.codigo_proveedor = '911000001';
    this.solicitud.nombre_proveedor = 'PROVEEDORE PRUEBA';
    this.solicitud.usuario_creacion = 'faruni';
    this.solicitud.fecha_creacion = new Date('2018-11-27');
    this.solicitud.usuario_modificacion = 'faruni';
    this.solicitud.fecha_modificacion = new Date('2018-11-27');
  }

// Funcion para Guardar la Cabecera de la solicitud

  onSaveSolicitudCompra(s: SolicitudCompra): void {
    this.openLoading();
    s.autorizador = localStorage.getItem('id_superior');
    s.estado = 'A';
    s.estado_autorizacion_superior = 'P';
    s.motivo_autorizacion = 'NA';
    s.estado_transferencia = 'N';
    s.motivo_anulacion = 'NA';
    s.solicitante = localStorage.getItem('username');
    s.usuario_anulacion = 'NA';
    s.usuario_creacion = localStorage.getItem('username');
    s.usuario_modificacion = localStorage.getItem('username');

    this.servSC.saveSolicitudCompra(s).subscribe(
        data => {
          this.closeLoading();
          if (data['status'] == 304) {
              this.toast.show('No se guardo, revise la información', 3000, 'red');
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
                this.toast.show('Se guardo correctamente!', 1000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
              } else {
                this.ldetallesolicitudservicio.forEach(element => {
                  this.detallesolicitudservicio = new DetalleSolicitud();
                  this.detallesolicitudservicio = element;
                  this.detallesolicitudservicio.codigo_solicitud = s.codigo;
                  this.detallesolicitudservicio.estado = 'A';
                  this.detallesolicitudservicio.tipo_item = s.tipo;
                  this.onSaveDetalleSolicitudCompra(this.detallesolicitudservicio);
                });
                this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
              }
              this.solicitud.adjuntos = [];
              // this.onSaveUploadFilesSolicitud(this.lfiles, this.solicitud.codigo);
          }
        // this.toast.show('Se guardo correctamente!', 3000, 'green', () => this.router.navigate(['/sc/solicitud/list/']));
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('No se guardo, ocurrio un error!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onValidaCabeceraSolicitud() {
    if (this.solicitud.tipo == 'I') {
      if (this.ldetallesolicitud.length > 0) { // Valida si existen items agregados en la solicitud
        // this.toast.show('Guardando' + this.solicitud.codigo, 1000, 'green');
        this.onSaveSolicitudCompra(this.solicitud);
      }else {
        this.toast.show('No existen Items agregados a la solicitud ' + this.solicitud.codigo, 3000, 'red');
      }
    } else {
      if (this.ldetallesolicitudservicio.length > 0) { // Valida si existen items agregados en la solicitud
        // this.toast.show('Guardando' + this.solicitud.codigo, 1000, 'green');
        this.onSaveSolicitudCompra(this.solicitud);
      }else {
        this.toast.show('No existen Items agregados a la solicitud ' + this.solicitud.codigo, 3000, 'red');
      }
    }
  }


  // Funcion para obtener proveedores
  onGetProveedores(): void {
    this.openLoading();
    this.servSC.getProveedoresSC().subscribe(
      data => {
        this.closeLoading();
        this.proveedores = data['body'];
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

  // Funcion para obtener Item de Tipo Articulo
  onGetItemArticulo(tipo: string): void {
    this.openLoading();
    this.servSC.getItemArticuloSC(tipo).subscribe(
      data => {
        this.closeLoading();
        this.articulos = data['body'];
        // this.toast.show('Se obtuvieron' + data['length'].toString() + ' articulos correctamente!', 1000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener los Items!', 3000, 'red');
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
          // if(this.detallesolicitud.fecha_arte.getFullYear)
          if(this.detallesolicitud.fecha_arte.getFullYear() == 1753){
            this.existeFechaArte = false;
          } else {
            this.existeFechaArte = true;
          }
          this.view_fecha_arte = true;
          // console.log(fecha_arte);
        } else {
          let cod_prod = codigo_producto.substring(0, 2);
          // alert(cod_prod);
          if (cod_prod === 'MA') {
            this.toast.show('Este producto no cuenta con una fecha de arte', 2000, 'red');
          }
          this.view_fecha_arte = false;
          this.detallesolicitud.fecha_arte = new Date('1753-01-01');
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
    this.detallesolicitudservicio.fecha_arte = new Date('1990-01-01');
    this.detallesolicitudservicio.estado = 'S';
    this.detallesolicitudservicio.usuario_creacion = localStorage.getItem('username');
    this.detallesolicitudservicio.fecha_creacion = new Date('2018-11-27'); // se cambian en el servicio
    this.detallesolicitudservicio.usuario_modificacion = localStorage.getItem('username');
    this.detallesolicitudservicio.fecha_modificacion = new Date('2018-11-27'); // se cambian en el servicio
    this.ldetallesolicitudservicio.push(this.detallesolicitudservicio);
    this.detallesolicitudservicio = new DetalleSolicitud();
  }

  onQuitarItemSolicitud(articulo: DetalleSolicitud) {
    if (this.ldetallesolicitud.find(x => x == articulo)) {
      this.ldetallesolicitud.splice(this.ldetallesolicitud.indexOf(articulo), 1);
    }
    // alert(codigo);
  }

  onQuitarServicioSolicitud(servicio: DetalleSolicitud) {
    if (this.ldetallesolicitudservicio.find(x => x == servicio)) {
      this.ldetallesolicitudservicio.splice(this.ldetallesolicitudservicio.indexOf(servicio), 1);
    }
  }

  onGeneraCodigo() {
    this.openLoading();
    this.servSC.getCodigoGeneradoSC().subscribe(
      data => {
        if (data['body'] === 0) {
          this.toast.show('Ocurrio un error al generar el Codigo de Solicitud', 1000, 'red');
        }
        this.solicitud.codigo = data['body'];
        this.closeLoading();
      }, (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error en el Servidor', 1000, 'red');
        this.closeLoading();
      }
    );
  }

  // Subir archivos
  resetFileButton() {
    // console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    // console.log(this.myInputVariable.nativeElement.files);
    this.lfiles = new Array<SCFile>();
  }
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

  //#region MODIFICAR DETALLE ARTICULO -----------------------------------------------------------
  onModificarArticulo(codigo: string) {
    alert(codigo);
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

    // Inicializa el componente de Dialogo.
    // public initilaizeTarget: EmitType<object> = () => {
    //  this.targetElement = this.container.nativeElement.parentElement;
    // }

    public validation (event: any): void {
    }
    // Sample level code to handle the button click action
    public onOpenDialog = function(event: any): void {
      // Call the show method to open the Dialog
      this.ejDialog.show();
    };

    //#region UPLOAD DIALOG ---------------------------------------------------
     // Inicialoza el Componente Dialo Uploads
    /*public initilaizeTargetUpload: EmitType<object> = () => {
      this.targetElementupload = this.containerupload.nativeElement.parentElement;
    }*/
    // Esta funcion se activa cuando presiona el boton Adjuntar y permite abrir el Modal de Adjuntos
    public onOpenDialogUpload = function(event: any): void {
        // Call the show method to open the Dialog
        this.ejDialogupload.show();
    };

    // Mediante esta función podemos enviar información adicional a la WEBAPI
    public onFileUpload: EmitType<SelectedEventArgs> = (args: any) =>  {
      // add addition data as key-value pair.
      args.customFormData = [{'codigo_solicitud': this.solicitud.codigo }];
    }

    // Esta función se ejecuta cuando los archivos adjuntos de la solicitud fueron subidas correctamente
    public onUploadSuccess(args: any): void {
      console.log(args);
      let nombre_archivo: string = args.file.name.toString();
      if (args.operation === 'upload') {
        this.solicitud.adjuntos.push(nombre_archivo); // Adicionamos a la lista de nombres de archivos adjuntos a la solicitud
      } else if (args.operation === 'remove') {
        if (this.solicitud.adjuntos.find(x => x == nombre_archivo)) { // Verifica si existe el elemento
          this.solicitud.adjuntos.splice(this.solicitud.adjuntos.indexOf(nombre_archivo), 1);
        }
        // this.solicitud.adjuntos = this.removeItemFromArr(this.solicitud.adjuntos, args.file.name);
      }
    }

    // Esta función se ejecuta cuando ocurre un error al subir los archivos adjuntos a la solicitud
    public onUploadFailure(args: any): void {
      console.log(args);
    }

    // Esta función permite elimina elementos de un array de tipo string
    public removeItemFromArr( arr, item ) {
      return arr.filter( function( e ) {
          return e !== item;
      } );
    }

    abrirModalAgregarItem(){
      this.modalAddItem.openModal();
    }
}


