import { Component, OnInit } from '@angular/core';
import { Conversacion } from '../../solicitud/notifysc/conversacion';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { MzToastService } from 'ngx-materialize';
import { HttpErrorResponse } from '@angular/common/http';
import { Comunes } from '../../../comunes';
import { OrdenService } from '../orden.service';
import { OCOrdenCompra } from '../orden';
import { DetalleOrden } from '../detalleorden';

@Component({
  selector: 'app-notifyoc',
  templateUrl: './notifyoc.component.html',
  styleUrls: ['./notifyoc.component.scss'],
})
export class NotifyocComponent implements OnInit {
  codigo_solicitud: string;
  username: string;
  nombre_usuario: string;
  orden_compra: OCOrdenCompra = new OCOrdenCompra();
  detalle_orden: Array<DetalleOrden> = new Array<DetalleOrden>();
  codigos_solicitud: Array<String> = new Array<String>();

  conversacion: Conversacion = new Conversacion();
  lconversacion: Array<Conversacion> = new Array<Conversacion>();


  constructor(private route: ActivatedRoute, private router: Router,
    private servSC: SolicitudService, private servOC: OrdenService, private toast: MzToastService, private comunes: Comunes) {
    this.route.params
    .subscribe(params => {
        this.codigo_solicitud = params['id'].toString();
        // this.onLoadUser(atob(this.username));
    });

    this.username = localStorage.getItem('username');
    this.nombre_usuario = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
  }

  ngOnInit() {
    this.onLoadValoresInicialesConversacion();
    this.onGetOrdenCompra();
    this.onGetConversaciones(this.codigo_solicitud);
  }

  onDirigirOrden() {
    if (this.username == 'mzeballos' || this.username == 'jayala') {
      this.router.navigate(['sc/orden/list_aut/']);
    }else if(this.username == 'jocampod') {
      this.router.navigate(['sc/orden/list_g/']);
    }else {
      this.router.navigate(['sc/orden/list/']);
    }
  }


  onGetOrdenCompra(): void {
    this.servOC.getOrdenXCodigo(this.codigo_solicitud).subscribe(
      data => {
        this.orden_compra = data['body'];
        this.onGetDetalleOrdenCompra();
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener la orden de compra!', 1000, 'red');
        if (err.error instanceof Error) {
          
        } else {
          
        }
      }
    );
  }

  onGetDetalleOrdenCompra(): void {
    this.servOC.getDetalleOrdenXCodigo(this.codigo_solicitud).subscribe(
      data => {
        this.detalle_orden = data['body'];

        this.detalle_orden.forEach(element => {
            this.codigos_solicitud.push(element.codigo_solicitud);
        });
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener la orden de compra!', 1000, 'red');
        if (err.error instanceof Error) {
          
        } else {
          
        }
      }
    );
  }

  
  // Funciones para obtener las conversaciones de la solicitud del servidor
  onGetConversaciones(codigo_solicitud: string): void {
    this.servOC.getConversacionesXOrden(codigo_solicitud).subscribe(
      data => {
        this.lconversacion = data['body'];
        // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' mensajes correctamente!', 1000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los mensajes!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  onLoadValoresInicialesConversacion() {
    this.conversacion.codigo_documento = this.codigo_solicitud;
    this.conversacion.estado = 'N';
    this.conversacion.nombre_usuario = this.nombre_usuario;
    this.conversacion.username = this.username;
    this.conversacion.mensaje = '';
  }

  ngOnSaveConversacion() {
    this.conversacion.fecha_hora = this.comunes.obtenerFechaYHoraActual();
    this.servOC.saveConversacionOrden(this.conversacion).subscribe(
        data => {
          this.onGetConversaciones(this.conversacion.codigo_documento);
          this.onLoadValoresInicialesConversacion();
          // console.log(data);
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error al enviar este mensaje!', 1000, 'red');
          if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
  }
}
