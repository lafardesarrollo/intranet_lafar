import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { AppsService } from '../apps/apps.service';
import {AppsChk} from '../apps/appschk';
import {UsersApps} from './usersapps';
import { UsersAppsService } from './usersapps.service';

@Component( {
  selector: 'app-admusersapps',
  templateUrl: './adminusersapps.component.html',
  styleUrls: ['./adminusersapps.component.scss']
})
export class AdminUsersAppsComponent implements OnInit {
  public sub: Users;
  public username = '';
  public aplicaciones: Array<AppsChk>;
  public usersaplicaciones: Array<UsersApps> = new Array<UsersApps>();
  constructor(private sdata: UsersService,
              private servapps: AppsService,
              private route: Router,
              private router: ActivatedRoute,
              private servusapp: UsersAppsService) { }
  ngOnInit() {
    this.router.params
            .subscribe(params => {
                this.username = params['id'].toString();
            });
    this.onloadusuario();
  }
  onloadusuario() {
    this.sdata.getUser(this.username).subscribe(
      data => {
        data.body.forEach(element => {
          this.sub = element;
          // console.log('datos del usuario del cual se administrara las aplicaciones');
          // console.log(this.sub);
          this.onloadAplicaciones();
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
         // // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  onloadAplicaciones() {
    this.servapps.getAllChk().subscribe(
      data => {
        this.aplicaciones = data.body;
         // // console.log('datos todas las aplicaciones existentes');
         // console.log('aplicaciones creadas');
           // console.log(this.aplicaciones);
           this.onloadappsusers(this.sub.userid);
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
  onloadappsusers(idus: string) {
    this.servusapp.getbyuserid(idus).subscribe(
      data => {
        this.usersaplicaciones = data.body;
        this.cambiaEstadosChek();
         // // console.log('datos todas las aplicaciones existentes');
         // console.log('aplicaciones por usuario');
           // console.log(this.usersaplicaciones );
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error: ', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  cambiatipocheck(check: string) {
    if (check == '0') {
      return false;
    } else {
     return true;
    }
  }
  cambiaEstadosChek() {
    this.cambiaEstadosChekini();
    this.aplicaciones.forEach(
      element => {
          this.usersaplicaciones.forEach(
            elementua => {
                if (element.id === elementua.appid) {
                  element.checked = true;
                }
            });
      });
  }
  cambiaEstadosChekini() {
    this.aplicaciones.forEach(
      element => {
          element.checked = false;
      });
  }
  enCambioEstado(itmcf: AppsChk ) {
    itmcf.checked = !itmcf.checked;
    let usappainsertar: UsersApps  = new UsersApps();
    usappainsertar.appid = itmcf.id;
    usappainsertar.userid = this.sub.userid;
    usappainsertar.usuario_creacion = localStorage.getItem('username');
    usappainsertar.usuario_modificacion = localStorage.getItem('username');
    if (itmcf.checked) {
     this.insertaruserapp(usappainsertar);
      // alert('positivo');
    } else {
      // // console.log('eliminando aplicaion');
      // // console.log(usappainsertar);
       this.eliminaruserapp(usappainsertar);
      // alert('negativo');
    }
  }
  insertaruserapp(usap: UsersApps) {
    this.servusapp.insert(usap).subscribe(
      data => {
        this.usersaplicaciones.push(usap);
       // alert ('se inserto la aplicacion...');
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
  eliminaruserapp(usap: UsersApps) {
    this.servusapp.remove(usap).subscribe(
      data => {
       // console.log ('se eliminó...');
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
}
