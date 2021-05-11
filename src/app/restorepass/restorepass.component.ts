import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, Validators, NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';
import { MzButtonModule, MzInputModule, MzModalService } from 'ngx-materialize';
import { Globals } from '../globals';
import { LoginService } from '../login/login.service';
import { UsersService } from '../admin-intranet/users/users.service';
import { Users } from '../admin-intranet/users/users';

@Component({
    selector: 'app-restorepass',
    templateUrl: './restorepass.component.html',
    styleUrls: ['./restorepass.component.scss']
})

export class RestorePassComponent implements OnInit {
    public pass;
    email_address: string;
    datos: any;
    user: Users;
    username: string;
    password: String;
    confirmPassword: String;

    errorMessages = {
        email_address: {
            required: 'Correo no valido',
            email: ' (ejemplo@lafar.net)'
        },
        password: {
            required: 'Contraseña Requerida'
        },
        confirmPassword: {
            required: 'Este campo es requerido'
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public servLogin: LoginService,
        public servUser: UsersService,
        public servNotification: NotificationsService
    ) {
        this.email_address = '';
        this.password = '';
        this.confirmPassword = '';
        this.pass = { username : '', password: ''};
    }

    ngOnInit(): void {
        this.abrirLoader();
        this.route.params
            .subscribe(params => {
                this.username = params['id'].toString();
                this.onLoadUser(atob(this.username));
            });
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
        this.openLoading();
        this.pass.username = this.username;
        this.pass.password = this.password;

        // console.log(this.pass);
        this.servUser.changePasswordForUser(this.pass).subscribe(data => {
            // console.log(data);
            this.closeLoading();
            this.openNotificacion(1, 'Correcto!', 'Se realizo el cambio correctamente!');
            this.router.navigate(['/home']);
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                // console.log('Ocurrio un error:', err.error.message);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
            this.openNotificacion(3, 'Error', 'Ocurrio un Error con el Servidor');
            this.closeLoading();
        });
    }

    onLoadUser(username): void {
        this.user = new Users();
        this.servUser.getUser(username).subscribe(
            data => {
                // console.log(data);
                this.user = data.body[0];
                // console.log(this.user);
                this.email_address = this.user.email_address;
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
