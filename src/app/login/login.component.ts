import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from './login';
import { Usuario } from '../models/usuario';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';
import { MzButtonModule, MzInputModule, MzModalService } from 'ngx-materialize';
import { Globals } from '../globals';
import { Users } from '../admin-intranet/users/users';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    @ViewChild('form') form: FormGroup;
    submitted = false;
    submittedValues: any;
    returnUrl: string;
    returnUrlChangePassword: string;
    model: any = {};
    usuario: any;
    login: Login;

    errorMessages = {
        username: {
            required: 'Nombre de Usuario requerido'
        },
        password: {
            required: 'La contraseña es requerida'
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private srvLogin: LoginService,
        private _service: NotificationsService,
        private _serviceAlert: AlertsService,
        private _modalService: MzModalService,
        private global: Globals
    ) {
    }


    open2(type: AlertType) {
        this._serviceAlert.create(type, 'This is a message');
    }

    open() {
        this._service.success(
            'Some Title',
            'Some Content',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            }
        );
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['home'] || '/';
        this.returnUrlChangePassword = this.route.snapshot.queryParams['admin/users/password'] || '/';
        this.abrirLoader();
    }

    onLoggedin() {
        this.openLoading();
        this.onSubmit();
        this.login = new Login(this.model.username, this.model.password);
        // let urlOLDL = this.global.urlIntranet + 'sesionactiva.php' + '?username=' +
        // this.model.username + '&password=' + this.model.password;
        let urlOLDL = this.global.urlIntranet + 'sesionactiva.php' + '?username=' + this.model.username;
        window.open(urlOLDL, '_blank');
        // , 'top=1000 ,left=1000 ,width=1, height=1, scrollbars=no, menubar=no, location=no, resizable=no');
        this.srvLogin.login(this.login).subscribe(
            data => {
                this.closeLoading();
                if (data.length > 0) {
                    this.usuario = data.body;
                    this.onLoadUserInformation(this.usuario[0], this.login);
                    if (this.usuario[0].nombre_estado === 'activo') {
                        // console.log('Bienvenido a Lafarnet');
                        this._service.success(
                            'Acceso Correcto!',
                            'Bienvenido a Lafarnet',
                            {
                                timeOut: 2000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate([this.returnUrl]);
                    } else if (this.usuario[0].nombre_estado === 'bloqueado') {
                        // console.log('Su cuenta se encuentra bloqueada');
                        this._service.warn(
                            'Acceso no autorizado',
                            'Su cuenta se encuentra Bloqueada',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                    } else if (this.usuario[0].nombre_estado === 'eliminado') {
                        // console.log('La cuenta de usuario ya no existe');
                        this._service.info(
                            'Acceso no autorizado',
                            'Comuniquese con el Administrador',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                    } else if (this.usuario[0].nombre_estado === 'nuevo') {
                        // console.log('Usuario Nuevo');
                        this._service.success(
                            'Importante',
                            'Necesita cambiar su contraseña',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                        //localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/restorepass/' + btoa(this.login.userid)]);
                    } else {}
                }else {
                    // console.log('Usuario o Contraseña Incorrecta');
                    this._service.error(
                        'Error de Autenticación!',
                        'Usuario o Clave Incorrecta',
                        {
                            timeOut: 3000,
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
                }
            },
            (err: HttpErrorResponse) => {
              // console.log(err);
              this.closeLoading();
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                // console.log('Ocurrio un error:', err.error.message);
                    this._service.error(
                        'No se puede conectar!',
                        'Favor revise su Conexion',
                        {
                            timeOut: 3000,
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
                    this._service.error(
                        'Ocurrio un error en el Servidor!',
                        'Comuniquese con el Administrador',
                        {
                            timeOut: 3000,
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
                }
            }
        );
    }

    cargarUsuarios(): void {
        this.srvLogin.getUsuarios().subscribe(
            data => {
                // console.log(data['body']);
                this.usuario = data.body;
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
            }
        );
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
        this.submitted = true;
        this.submittedValues = this.form.value;
    }

    onLoadUserInformation(user: any, login: Login) {
        localStorage.setItem('userid', user.userid);
        localStorage.setItem('first_name', user.first_name);
        localStorage.setItem('last_name', user.last_name);
        localStorage.setItem('email_address', user.email_address);
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', login.password);
        localStorage.setItem('id_cargo', user.id_cargo);
        localStorage.setItem('cargo', user.cargo);
        localStorage.setItem('id_regional', user.id_regional);
        localStorage.setItem('regional', user.regional);
        localStorage.setItem('id_grupo', user.id_grupo);
        localStorage.setItem('id_superior', user.id_superior);
        localStorage.setItem('id_area', user.id_area);
        localStorage.setItem('area', user.area);
        localStorage.setItem('id_seccion', user.id_seccion);
        localStorage.setItem('foto', user.foto);
        localStorage.setItem('estado', user.estado);
        localStorage.setItem('usuario_creacion', user.usuario_creacion);
        localStorage.setItem('fecha_creacion', user.fecha_creacion);
        localStorage.setItem('usuario_modificacion', user.usuario_modificacion);
        localStorage.setItem('fecha_modificacion', user.fecha_modificacion);
    }
}
