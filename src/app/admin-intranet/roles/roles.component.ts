import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from './roles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rol, UserRol } from './roles';
import { MzToastService } from 'ngx-materialize';
import { RequestUserRol } from '../../layout/components/sidebar/itemforapp';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
    codigo_aplicacion: string = '';
    nombre_aplicacion: string = '';
    nombre_usuario: string = '';

    id_rol: number = 0;

    public lrol: Array<Rol> = new Array<Rol>();

  loading = $('#loading');
  constructor(private route: ActivatedRoute, private servRoles: RolesService, private toast: MzToastService) { 
    this.route.params.subscribe(params => {
        this.codigo_aplicacion = params['id'].toString();
        this.nombre_usuario = params['username'];
        this.onLoadRoles(this.codigo_aplicacion);
    });
  }

  ngOnInit() {
    //this.openLoading();
    // alert(this.codigo_aplicacion + ' - ' + this.nombre_usuario);
    this.onCargarRolAsignado();
  }

  // Funciones Loading
  // openLoading() {
  //   const loading = $('#loading');
  //   loading.fadeIn();
  // }
  // closeLoading() {
  //     const loading = $('#loading');
  //     loading.fadeOut();
  // }

  asignarRol(event) {
    this.loading.fadeIn();
    let userRol: UserRol = new UserRol();
    userRol.id_rol = event.target.value;
    userRol.username = this.nombre_usuario;
    this.servRoles.asignarRolUsuario(userRol, this.codigo_aplicacion).subscribe(
      data => {
        this.onCargarRolAsignado();
        this.loading.fadeOut();
      }, error => {
        this.toast.show('Ocurrio un error al asignar el rol al usuario, Intente nuevamente!', 2000);
        this.loading.fadeOut();
      }
    );
  }

  onCargarRolAsignado(){
    let req: RequestUserRol = new RequestUserRol();
    req.username = this.nombre_usuario;
    req.id_app = this.codigo_aplicacion;
    this.loading.fadeIn();
    this.servRoles.getUserRolForApp(req).subscribe(
      resp => {
        this.loading.fadeOut();
        this.id_rol = resp.body['id_rol'];
      }, error => {
        this.loading.fadeOut();
        this.toast.show('Ocurrio un error al obtener los roles asignados al usuario', 1500);
      }
    );
  }

  onLoadRoles(code){
    this.loading.fadeIn();
    this.servRoles.getRolesForApps(code).subscribe(
        data => {
          this.loading.fadeOut();
          this.lrol = data['body'];
          // console.log("Roles Cargados Correctamente!!");
          // console.log(data);
        },
        (err: HttpErrorResponse) => {
          this.loading.fadeOut();
        }
    );
  }

}
