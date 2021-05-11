import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../users';
import { Globals } from '../../../globals';
import { UsersService } from '../users.service';
import { FilterListUserByPipe } from './filter-list-user.pipe';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {
  user: Users;
  userAll: any;
  estadoValue = true;
  p: any;
  search = '';
  constructor(
    private ref: ChangeDetectorRef,
    private sdata: UsersService,
    private global: Globals,
    private router: Router,
    private servNotification: NotificationsService
  ) { }


  ngOnInit() {
    this.onLoadUsers();
  }

  onLoadUsers() {
    this.user = new Users();
    this.sdata.getUsers().subscribe(
      data => {
        this.userAll = data.body;
        this.ref.markForCheck();
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

  editUser(username: string) {
    this.router.navigate(['/admin/profile', username]);
    // this.user = new Users();
    // this.sdata.getUser(username).subscribe(
    //   data => {
    //     this.user.userid = data.body[0].userid;
    //     this.user.first_name = data.body[0].first_name;
    //     this.user.last_name = data.body[0].last_name;
    //     this.user.email_address = data.body[0].email_address;
    //     this.user.username = data.body[0].username;
    //     this.user.password = data.body[0].password;
    //     this.user.id_cargo = data.body[0].id_cargo;
    //     this.user.cargo = data.body[0].cargo;
    //     this.user.id_regional = data.body[0].id_regional;
    //     this.user.regional = data.body[0].regional;
    //     this.user.id_grupo = data.body[0].id_grupo;
    //     this.user.id_superior = data.body[0].id_superior;
    //     this.user.id_area = data.body[0].id_area;
    //     this.user.area = data.body[0].area;
    //     this.user.id_seccion = data.body[0].id_seccion;
    //     this.user.foto = data.body[0].foto;
    //     this.user.estado = data.body[0].estado;
    //     this.user.nombre_estado = data.body[0].nombre_estado;
    //     this.user.id_super_area = data.body[0].id_super_area;
    //     this.user.usuario_creacion = data.body[0].usuario_creacion;
    //     this.user.fecha_creacion = data.body[0].fecha_creacion;
    //     this.user.usuario_modificacion = data.body[0].usuario_modificacion;
    //     this.user.fecha_modificacion = data.body[0].fecha_modificacion;
    //     // console.log(this.user);
    //     this.router.navigate(['/admin/profile', this.user]);
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       // console.log('Ocurrio un error:', err.error.message);
    //     } else {
    //       // The backend returned an unsuccessful response code.
    //       // The response body may contain clues as to what went wrong,
    //       // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
    //     }
    //   }
    // );
  }

  deleteUser (username: string): void {
    this.user = new Users();
    this.user.username = username;
    this.user.usuario_modificacion = this.global.user.username;
    this.sdata.deleteUser(this.user).subscribe(
      data => {
        this.onLoadUsers();
        this.openNotificacion(1, 'Su registro', 'fue eliminado Correctamente');
        // this.router.navigate(['/admin/profile', this.user]);
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
