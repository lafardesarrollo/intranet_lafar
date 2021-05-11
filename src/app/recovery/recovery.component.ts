import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng2-alerts';
import { MzButtonModule, MzInputModule, MzModalService } from 'ngx-materialize';
import { Globals } from '../globals';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { Users } from '../admin-intranet/users/users';

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styleUrls: ['./recovery.component.scss']
})

export class RecoveryComponent implements OnInit {
    user: Users;
    email_address: string;
    datos: any;
    returnUrl: string;
    errorMessages = {
        email_address: {
            required: 'Correo no valido',
            email: ' (ejemplo@lafar.net)'
        }
    };

    constructor(
        private modalService: MzModalService,
        public servLogin: LoginService,
        public servNotification: NotificationsService,
        private _alert: AlertsService,
        private route: ActivatedRoute,
        private router: Router) {
            this.email_address = '';
            this.user = new Users();
    }

    ngOnInit(): void {
        this.abrirLoader();
        this.returnUrl = this.route.snapshot.queryParams['home'] || '/';
    }

    public openServiceModal() {
        this.modalService.open(AlertComponent);
    }

    openLoading() {
        const loading = $('#loading');
        loading.fadeIn();
    }

    closeLoading() {
        const loading = $('#loading');
        loading.fadeOut();
    }

    abrirLoader() {
        const loader =  $('body');
        setTimeout(function(){
            loader.addClass('loaded');
        }, 200);
    }

    onSubmit() {

    }

    onSendEmail() {
        this.openLoading();
        this.datos = {'email_address': this.email_address };

        this.servLogin.getUsuarioForEmail(this.email_address).subscribe(
            data => {
                // console.log(data);
                if (data['status'] == 200) {
                    this.user = data.body[0];
                    this.servLogin.sendEmail(this.user).subscribe(
                        data => {
                            // console.log(data['body']);
                            this.closeLoading();
                            this.openServiceModal();
                            // this.router.navigate([this.returnUrl]);
                        },
                        (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                            // A client-side or network error occurred. Handle it accordingly.
                            // console.log('An error occurred:', err.error.message);
                          } else {
                            // The backend returned an unsuccessful response code.
                            // The response body may contain clues as to what went wrong,
                            // console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                          }
                          this.openNotificacion(3, 'Error!', 'Error en el Servidor');
                          this.closeLoading();
                        }
                    );
                }else {
                    this.openNotificacion(3, 'No se envio!', 'El email ingresado no pertenece a nuestros usuarios');
                    this.closeLoading();
                }
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                // console.log('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                // console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              }
              this.openNotificacion(3, 'Error!', 'Error en el Servidor');
              this.closeLoading();
            }
        );
    }


    openNotificacion(tipo: number, titulo: string, mensaje: string) {
        switch (tipo) {
          case 1:
            this.servNotification.success(
              titulo,
              mensaje,
              {
                  timeOut: 2000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
              }
            );
          break;
          case 2:
            // console.log('Alert');
            this.servNotification.alert(
              titulo,
              mensaje,
              {
                  timeOut: 2000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
              }
            );
          break;
          case 3:
            this.servNotification.error(
              titulo,
              mensaje,
              {
                  timeOut: 2000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
              }
            );
          break;
        }
    }
}
