import { Component, OnInit, Directive, forwardRef, Attribute, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Globals } from '../../../globals';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clave-user',
  templateUrl: './clave-user.component.html',
  styleUrls: ['./clave-user.component.scss']
})
export class ClaveUserComponent implements OnInit {
  model = {
    password1: localStorage.getItem('password'),
    oldPassword: '',
    password: '',
    confirmPassword: '',
    usernameUpdate: localStorage.getItem('username'),
    username: ''
  };
  returnUrl: string;
  submitted = false;
  constructor(
    private global: Globals,
    private servUser: UsersService,
    private servNotification: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  onSubmit() {
    this.submitted = true;
    this.model.username = localStorage.getItem('username');
    this.model.usernameUpdate = localStorage.getItem('username');
    // this.returnUrl = this.route.snapshot.queryParams['list'] || '/';

    // this.router.navigate(['/home']);

    this.onChangePassword();
  }

  ngOnInit() {

  }
  onChangePassword() {
    this.servUser.changePassword(this.model).subscribe(
    data => {
      this.openNotificacion(1, 'Correcto!', 'La contraseña fue cambiada');
      this.global.user.estado = 1;
      this.router.navigate(['/home']);
    }, (err: HttpErrorResponse) => {
      this.openNotificacion(3, 'No se guardo', 'Ocurrio un error');
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
