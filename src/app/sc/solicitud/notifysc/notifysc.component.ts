import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';
import { Conversacion } from './conversacion';

@Component({
  selector: 'app-notifysc',
  templateUrl: './notifysc.component.html',
  styleUrls: ['./notifysc.component.scss'],
})
export class NotifyscComponent implements OnInit {
  codigo_solicitud: string;
  username: string;
  nombre_usuario: string;

  conversacion: Conversacion = new Conversacion();
  lconversacion: Array<Conversacion> = new Array<Conversacion>();

  constructor(private route: ActivatedRoute, private router: Router, private servSC: SolicitudService, private toast: MzToastService) {
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
    this.onGetConversaciones(this.codigo_solicitud);
  }

  onDirigirSolicitud() {
    this.router.navigate(['sc/solicitud/detail/' + this.codigo_solicitud]);
  }

  // Funciones para obtener las conversaciones de la solicitud del servidor
  onGetConversaciones(codigo_solicitud: string): void {
    this.servSC.getConversacionesXSolicitud(codigo_solicitud).subscribe(
      data => {
        this.lconversacion = data['body'];
        // this.toast.show('Se obtuvieron ' + data['length'].toString() + ' mensajes correctamente!', 1000, 'green');
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener los mensajes!', 2000, 'red');
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
    this.conversacion.fecha_hora = this.obtenerFechaActual();
    this.servSC.saveConversacionSolicitud(this.conversacion).subscribe(
        data => {
          this.onGetConversaciones(this.conversacion.codigo_documento);
          this.onLoadValoresInicialesConversacion();
          // console.log(data);
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error al enviar este mensaje!', 2000, 'red');
          if (err.error instanceof Error) {
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          }
        }
      );
  }

    obtenerFechaActual(): string {
        let fecha_actual: string = '';
        let fecha: Date = new Date();
        fecha_actual = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        return fecha_actual;
    }
}
