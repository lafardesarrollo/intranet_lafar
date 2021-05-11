import { Component, OnInit, Renderer, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Publicacion } from '../../../models/publicacion';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
import { NotificationsService } from 'angular2-notifications';
import { HomeService } from '../home.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { BotonesService } from '../botones.service';

declare var $: any;
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  est_btn_add_pub = false;
  publications: any;
  scrollElement: JQuery;
  formPublicacion: FormGroup;
  submitted = false;
  submittedValues: any;
  model: any = {};
  publicacion: Publicacion = new Publicacion();
  elem: any;
  elemDoc: any;
   botonesActivos: Array<any> = new Array() ;
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

  errorMessages = {
    titulo: {
      required: 'Es necesario que ingrese el Titulo'
    },
    fechaCaduca: {
      required: 'Es necesario la Fecha de Caducidad'
    },
    urlImagen : {
      required: 'Es necesario que Seleccione una imagen para mostrar'
    }
  };

  constructor(
    private router: Router,
    private global: Globals,
    private _notification: NotificationsService,
    private hSer: HomeService,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    public ngxSmartModalService: NgxSmartModalService,
    private servBotones: BotonesService ) {
  }

  ngOnInit() {
    this.onLoadPublications();
    this.onLoadBotonesAcivo();
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.elem.files.length >= 0) {
      let formData = new FormData();
      formData.append('file', this.elem.files[0]);
      formData.append('username', (localStorage.getItem('username')).replace('.', '_'));
      formData.append('id_area', '1');
      formData.append('tipo_publicacion', '1');
      formData.append('titulo', this.publicacion.titulo);
      formData.append('fechaCaduca', this.publicacion.fechaCaduca);
      this.hSer.upload(formData).subscribe(
        data => {
          this._notification.success(
            'Correcto!',
            'Se publico correctamente!',
            {
                timeOut: 2000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            }
          );
          // console.log(data);
          this.onLoadPublications();
        },
        (err: HttpErrorResponse) => {
          // console.log('error!', err);
        }
      );
    }
  }

  buildForm() {
    this.formPublicacion = this.formBuilder.group({
      titulo: '',
      fechaCaduca: '01-01-1990'
    });
  }
  uploadFile(event) {
    this.elem = event.target;
    // console.log(event);
  }

  onLoadPublications(): void {
    this.hSer.getPublications().subscribe(
        data => {
            this.publications = data.body;
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
  /*madificacion 8-5-18 */
  onLoadBotonesAcivo(): void {
    this.servBotones.getBotonesActivos(localStorage.getItem('username')).subscribe(
      data => {
            this.botonesActivos = data.body;
            // this.activacionBoton(nombrebtn);
            // console.log ('botones activos');
            // console.log(this.botonesActivos);
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
  activacionBoton(nombrebtn: string ) {
    let resp = false;
      this.botonesActivos.forEach(element => {
        if (element.estado == '1' && element.buttonActivo == '1' && element.butonName == nombrebtn ) {
           resp = true;
        }
      });
      return resp;
  }

}
