import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { MzModalService, MzToastService } from 'ngx-materialize';
import { TrackingService } from '../tracking.service';
import { Seguimiento } from '../models/seguimiento.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ModalMapaComponent } from '../modal-mapa/modal-mapa.component';

@Component({
  selector: 'app-tracking-diario',
  templateUrl: './tracking-diario.component.html',
  styleUrls: ['./tracking-diario.component.scss']
})

export class TrackingDiarioComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  loading = $('#loading');
    
  lseguimiento: Array<Seguimiento> = new Array<Seguimiento>();
  ltareas: Array<Seguimiento> = new Array<Seguimiento>();

  term: string ='';
  fecha_seleccionada: string = '';
  usuario_seleccionado: string = '';

  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  zoom = 12;

  options: Pickadate.DateOptions = {
    clear: 'Borrar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'yyyy-mm-dd',
    // formatSubmit: 'yyyy-mm-dd',
    onClose: () => this.seleccionarFecha(),
    // onOpen: () => alert('abriste el picker.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };
  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      // alert('Ready');
      console.log(modal, trigger);
    },
    complete: () => { 
      // alert('Closed'); 
    } // Callback for Modal close
  };

  constructor(
      private modalService: MzModalService,
      public global: Globals, private servTracking: TrackingService, private toast: MzToastService, httpClient: HttpClient
      ) { 
        this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAhH0T2vm_Sg2TxQW_zl5jYtKwzxGx64v4', 'callback').pipe(
          map(() => true), catchError(() => of(false)),
        );
      }

  ngOnInit() {
    this.ObtenerUsuariosSeguimiento();
  }

  seleccionarFecha(){
    this.CargarDetalleActividad();
  }
  
  ObtenerUsuariosSeguimiento(){
    this.loading.fadeIn();
    this.servTracking.getEmpleados().subscribe(resp =>{
        this.loading.fadeOut();
        if(resp.status) {
            if(resp.length > 0){
                this.lseguimiento = resp.body;
            } else {
                this.toast.show('No existen usuarios', 1000);
            }
        } else {
            this.toast.show('Ocurrio un error al obtener los Usuarios', 1000);
        }     
    }, error => {
        this.loading.fadeOut();
        this.toast.show('Ocurrio un error al obtener los Usuarios', 1000);
    });
  }

  ObtenerDetalleActividadesUsuarios(_username: string){
    this.usuario_seleccionado = _username;
    this.CargarDetalleActividad();
    
  }

  CargarDetalleActividad(){
    if(this.usuario_seleccionado.length > 1 && this.fecha_seleccionada.length > 1) {
      let seguimiento: Seguimiento = new Seguimiento();
      seguimiento.username = this.usuario_seleccionado;
      seguimiento.fecha_hora = new Date(this.fecha_seleccionada);

      this.loading.fadeIn();
      this.servTracking.getDetalleTareasEmpleados(seguimiento).subscribe(resp =>{
          this.loading.fadeOut();
          if(resp.status) {
              if(resp.length > 0){
                  this.ltareas = resp.body;
              } else {
                  this.ltareas = [];
                  this.toast.show('No existen registros del usuario para la fecha seleccionada', 2000);
              }
          } else {
              this.toast.show('Ocurrio un error al obtener Registros de esta fecha', 1000);
          }     
      }, error => {
          this.loading.fadeOut();
          this.toast.show('Ocurrio un error al obtener registros de esta fecha', 1000);
      });
    } else if(this.usuario_seleccionado.length > 1 && this.fecha_seleccionada.length < 2){
      this.toast.show('Seleccione una fecha', 2000, 'red');
    } else if(this.usuario_seleccionado.length < 2 && this.fecha_seleccionada.length > 1){
      this.toast.show('Seleccione un empleado', 2000, 'red');
    } else {
      this.toast.show('Seleccione una fecha y un empleado', 2000, 'red');
    }
  }

  BuscarEmpleado(filtro: string){
    this.term = filtro;
    console.log(filtro);
  }

  abrirDetalleSeguimiento(username: string){
    this.ObtenerDetalleActividadesUsuarios(username);
  }

  seleccionaDetalleSeguimiento(_seguimiento: Seguimiento){
    // alert(_seguimiento.latitud);
    this.center.lat = Number(_seguimiento.latitud);
    this.center.lng = Number(_seguimiento.longitud);

    this.modalService.open(ModalMapaComponent, { seguimiento: _seguimiento });
  }
}