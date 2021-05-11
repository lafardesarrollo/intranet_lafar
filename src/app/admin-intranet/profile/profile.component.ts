import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../users/users';
import { Globals } from '../../globals';
import { AppsForUser } from '../../layout/components/header/appsforuser';
import { LayoutService } from '../../layout/layout.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { NotificationsService } from 'angular2-notifications';
import { CargosService } from '../cargos/cargos.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AreasService } from '../areas/areas.service';
import { RegionalesService } from '../regionales/regionales.service';
import { Cargos } from '../cargos/cargos';
import { Areas } from '../areas/areas';
import { Regionales } from '../regionales/regionales';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { MzToastService } from 'ngx-materialize';
import { Superarea } from '../superarea/superarea';
import { SuperareaService } from '../superarea/superarea.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // id_super_area: number;
  lsuperareas: Array<Superarea> = new Array<Superarea>();

  p: any = 1;
  user: Users = new Users();
  usuario: Users = new Users();

  username: string = '';

  private sub: any;
  public apps: any;
  private appsforuser: AppsForUser;

  public cargoData: CompleterData;
  public cargo: Cargos;
  public cargos: any;
  public area: Areas;
  public areas: any;
  public regional: Regionales;
  public regionales: any;
  public descripcionCargo: string = 'SECRETARIA DE GERENC';

  public lsuperior: Array<Users> = new Array<Users>();
  public userSuperior: Array<Users> = new Array<Users>();
  public u_superior: any = {
    name : '',
    cargo : '',
    foto : ''
  };
  errorMessages = {
    first_name: {
      required: 'Es necesario que ingrese su(s) Nombre(s)',
    },
    last_name: {
      required: 'Es necesario que ingrese sus Apellidos',
    },
    email_address: {
      required: 'Correo no valido',
      email: ' (ejemplo@lafar.net)'
    },
    username: {
      required: 'Nombre de usuario requerido',
    },
    password: {
      required: 'Clave de acceso requerida',
    },
    cargo: {
      required: 'Seleccione un Cargo'
    },
    area: {
      required: 'Seleccione un Área'
    },
    regional: {
      required: 'Seleccione una Regional'
    }
  };


  // asignar superior

  superior: Boolean = false;
  term: string ='';
  constructor(
    private router: Router,
    private servNotification: NotificationsService,
    private route: ActivatedRoute,
    public global: Globals,
    private layoutService: LayoutService,
    private servUser: UsersService,
    private servCargo: CargosService,
    private completerService: CompleterService,
    private servArea: AreasService,
    private servRegional: RegionalesService,
    private servSuperArea: SuperareaService,
    private toastService: MzToastService,
    private _activatedroute: ActivatedRoute
  ) {
    this.username = this._activatedroute.snapshot.paramMap.get("id");
    // alert(this.username);
    // this.route.params.subscribe(params => {
    //   this.username = params['username'];
    //   this.cargarUsuario();
    // });
   }

  ngOnInit() {
    this.user = new Users();
    this.onLoadSuperiores();
    this.cargarUsuario();
    // this.onLoadUser();
    this.onLoadApps(this.username);
    this.onLoadCargos();
    this.onLoadAreas();
    this.onLoadRegionales();
    this.onValidaSuperior();
    this.onLoadSuperAreas();
  }

  cargarUsuario(){
    // this.cargo = new Cargos();
      this.servUser.getUser(this.username).subscribe(
      data => {
        // this.usuario = data.body[0];
        this.user = data.body[0];
        this.onSuperior();
        // console.log(this.cargos);
        // this.cargoData = this.completerService.local(this.cargos, 'nombre_cargo', 'nombre_cargo');
        // console.log('-------------------------->--------->');
        // console.log(this.cargoData);
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

  onLoadUser() {
    this.sub = this.route.params.subscribe(params => {
      this.user.userid = params['userid'];
      this.user.first_name = params['first_name'];
      this.user.last_name = params['last_name'];
      this.user.email_address = params['email_address'];
      this.user.username = params['username'];
      this.user.password = params['password'];
      this.user.id_cargo = params['id_cargo'];
      this.user.cargo = params['cargo'];
      this.user.id_regional = params['id_regional'];
      this.user.regional = params['regional'];
      this.user.id_grupo = params['id_grupo'];
      this.user.id_area = params['id_area'];
      this.user.area = params['area'];
      this.user.foto = params['foto'];
      this.user.estado = params['estado'];
      this.user.nombre_estado = params['nombre_estado'];
      this.user.id_superior = params['id_superior'];
      this.user.id_super_area = params['id_super_area'];
      this.user.idsap = params['idsap'];
      this.user.id_seccion = params['id_seccion'];
      this.user.usuario_creacion = params['usuario_creacion'];
      this.user.fecha_creacion = params['fecha_creacion'];
      this.user.usuario_modificacion = params['usuario_modificacion'];
      this.user.fecha_modificacion = params['fecha_modificacion'];
    });
  }

  OnSelectSuperArea() {
    this.user.usuario_modificacion = localStorage.getItem('username');
    this.onUpdateSuperAreas();
  }

  onLoadApps(username): void {
    this.appsforuser = new AppsForUser(username);
    this.layoutService.AppsForUser(this.appsforuser).subscribe(
      data => {
          this.apps = data.body;
          // console.log(this.apps);
      },
      (err: HttpErrorResponse) => {

      }
    );
  }

  onBloquearUsuario() {
    this.servUser.bloquearUsuario(this.user.username.replace('.','|')).subscribe(
      data => {
        this.cargarUsuario();
        if (data['result'] === true) {
          this.user.nombre_estado = 'bloqueado';
          this.toastService.show(data['message'], 2000, 'green');
        } else {
          this.toastService.show(data['message'], 2000, 'red');
        }
      },
      (err: HttpErrorResponse) => {
        this.toastService.show('Ocurrio un error en el Servidor!', 2000, 'red');
      }
    );
  }

  enviarMensaje() {
    alert('Enviar Mensaje');
  }

  onSubmitInformacionGeneral() {
    this.guardarInformacionGeneral();
  }

  onSubmitInformacionLaboral() {
    this.guardarInformacionLaboral();
  }

  onSubmitEstadoUsuario() {
    this.guardarEstadoUsuario();
  }

  guardarInformacionGeneral() {
    this.user.usuario_modificacion =  localStorage.getItem('username');
    this.servUser.updateUserInformationGeneral(this.user).subscribe(
      data => {
        if (data.status === 200) {
          this.openNotificacion(1, 'Correcto!', 'Se modificaron los datos');
        }else {
          this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
        }
      }, (err: HttpErrorResponse) => {
        // console.log('error!', err);
        this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
      }
    );
  }

  guardarInformacionLaboral() {
    this.user.usuario_modificacion =  localStorage.getItem('username');
    this.servUser.updateUserInformationLaboral(this.user).subscribe(
      data => {
        if (data.status === 200) {
          this.openNotificacion(1, 'Correcto!', 'Se modificaron los datos');
        }else {
          this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
        }
      }, (err: HttpErrorResponse) => {
        // console.log('error!', err);
        this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
      }
    );
  }

  guardarEstadoUsuario() {
    this.user.usuario_creacion = localStorage.getItem('username');
  }

  onLoadCargos() {
    this.cargo = new Cargos();
      this.servCargo.getCargos().subscribe(
      data => {
        this.cargos = data.body;
        // console.log(this.cargos);
        this.cargoData = this.completerService.local(this.cargos, 'nombre_cargo', 'nombre_cargo');
        // console.log('-------------------------->--------->');
        // console.log(this.cargoData);
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

  onLoadAreas() {
    this.area = new Areas();
      this.servArea.getAreas().subscribe(
      data => {
        this.areas = data.body;
        // console.log(this.areas);
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

  onLoadRegionales() {
    this.regional = new Regionales();
      this.servRegional.getRegionales().subscribe(
      data => {
        this.regionales = data.body;
        // console.log(this.regionales);
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

  onLoadSuperAreas() {
      this.servSuperArea.getSuperArea().subscribe(
      data => {
        this.lsuperareas = data.body;
        // console.log(this.lsuperareas);
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

  filtrarRegistros(valor: string){
    this.term = valor;
    console.log(this.term);
  }

  onSuperior() {
    this.userSuperior = new Array<Users>();
      this.servUser.getUser(this.user.id_superior).subscribe(
      data => {
        this.userSuperior = data.body;
        // console.log(this.userSuperior);
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

  onLoadSuperiores() {
    // debugger;
    this.servUser.getUsersCompleter().subscribe(
      data => {
        this.lsuperior = data.body;
        // console.log(this.lsuperior);
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

  asignarNuevoAutorizador(username: string, userid: string) {
    this.user.userid = userid;
    this.user.id_superior = username;
    this.user.usuario_modificacion = localStorage.getItem('username');
    // alert(username + ' - ' + userid);
    this.servUser.updateSuperiorForUser(this.user).subscribe(
      data => {
        if (data.status == '200') {
          this.cargarUsuario();
          this.toastService.show('Se actualizo el Inmediato Superior Correctamente! ', 4000, 'green round');
          this.superior = true;

        } else {
          this.toastService.show('No se asigno. Intente nuevamente!', 4000, 'red round');
          this.superior = false;
        }
        // console.log(this.lsuperior);
      },
      (err: HttpErrorResponse) => {
        this.toastService.show('Ocurrio un error, comuniquese con el Administrador!', 4000, 'red round');
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
    // this.toastService.show(username, 4000, 'green round');
  }

  onUpdateSuperiorForUser(username: string) {
    this.user.id_superior = username;
    this.user.usuario_modificacion = localStorage.getItem('username');
    this.servUser.updateSuperiorForUser(this.user).subscribe(
      data => {
        if (data.status == '200') {
          this.cargarUsuario();
          this.toastService.show('Se asigno el Inmediato Superior Correctamente! ', 4000, 'green round');
          this.superior = true;

        } else {
          this.toastService.show('No se asigno. Intente nuevamente!', 4000, 'red round');
          this.superior = false;
        }
        // console.log(this.lsuperior);
      },
      (err: HttpErrorResponse) => {
        this.toastService.show('Ocurrio un error, comuniquese con el Administrador!', 4000, 'red round');
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
    // this.toastService.show(username, 4000, 'green round');
  }

  onUpdateSuperAreas() {
    this.user.usuario_modificacion = localStorage.getItem('username');
    this.servUser.updateSuperAreaForUser(this.user).subscribe(
      data => {
        if (data.status == '200') {
          this.cargarUsuario();
          this.toastService.show('Se asigno correctamente al Área!', 4000, 'green round');
        } else {
          this.toastService.show('No se asigno. Intente nuevamente!', 4000, 'red round');
        }
      },
      (err: HttpErrorResponse) => {
        this.toastService.show('Ocurrio un error, comuniquese con el Administrador!', 4000, 'red round');
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
    // this.toastService.show(username, 4000, 'green round');
  }

  onSelectCargo(selected: CompleterItem): void {
    if (selected) {
      this.user.id_cargo = selected.originalObject['id'];
      // console.log(this.user);
    } else {
      // console.log('Vacio');
    }
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

  onValidaSuperior() {
    if (this.user.id_superior == '0' || this.user.id_superior == '1') {
      this.superior = false;
    } else {
      this.superior = true;
    }
  }

// scn resetear contraseña a una por defecto
  resetPassword() {
   let model = {
      usernameUpdate: localStorage.getItem('username'),
      username: this.user.username,
    };
    const resp = confirm('Se asignara una contraseña por defecto para ' + model.username + '?');
    // alert (resp);
    if (resp) {
    this.servUser.resetPassword(model).subscribe(
      data => {
        this.cargarUsuario();
        // console.log('ingresando a reset de contraseña');
        // console.log(data);
        this.openNotificacion(1, 'Éxito', 'La contraseña fue reasignada');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
          this.openNotificacion(3, 'Error', 'No se pudo reasignar la contraseña ' + err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
          this.openNotificacion(3, 'Error', 'No se pudo reasignar la contraseña ' + err.status + ' ' + err.error);
        }
      }
    );
  }
  }

}
