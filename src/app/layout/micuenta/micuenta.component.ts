import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../../globals';
import { AppsForUser } from '../../layout/components/header/appsforuser';
import { LayoutService } from '../../layout/layout.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { Users } from '../../admin-intranet/users/users';
import { CargosService } from '../../admin-intranet/cargos/cargos.service';
import { AreasService } from '../../admin-intranet/areas/areas.service';
import { RegionalesService } from '../../admin-intranet/regionales/regionales.service';
import { Cargos } from '../../admin-intranet/cargos/cargos';
import { Areas } from '../../admin-intranet/areas/areas';
import { Regionales } from '../../admin-intranet/regionales/regionales';
import { UsersService } from '../../admin-intranet/users/users.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.scss']
})
export class MiCuentaComponent implements OnInit {
  // cambiar contraseña
  model = {
    password1: localStorage.getItem('password'),
    oldPassword: '',
    password: '',
    confirmPassword: '',
    usernameUpdate: localStorage.getItem('username'),
    username: ''
  };

  vpas1: Boolean = false;
  vpas2: Boolean = false;
  vpas3: Boolean = false;
  msgpas2: string = '';
  bchangepassword: Boolean = true;

  // End cambiar contraseña

  user: Users;
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

  urlFotoPerfil: string;
  isFileCharged: boolean = false;

//Subir archivos
elem: any;

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
    private toastService: MzToastService
  ) {
      this.isFileCharged = false;
  }

  ngOnInit() {
    this.urlFotoPerfil = this.global.urlImagenUserDefault;
    this.user = new Users();
    this.onLoadUser(localStorage.getItem('username'));

    this.onLoadCargos();
    this.onLoadAreas();
    this.onLoadRegionales();
  }

  onLoadUser(username): void {
    this.user = new Users();
    this.servUser.getUser(username).subscribe(
        data => {
            // console.log(data);
            this.user = data.body[0];
            this.onLoadApps(this.user.username);
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

onLoadApps(username): void {
    this.appsforuser = new AppsForUser(username);
    this.layoutService.AppsForUser(this.appsforuser).subscribe(
      data => {
          this.apps = data.body;
          // console.log(this.apps);
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

enviarMensaje() {
    alert('Enviar Mensaje');
}

validaClaveOLD() {
  if (this.model.oldPassword == localStorage.getItem('password')) {
    this.vpas1 = false;
  } else {
    this.vpas1 = true;
  }
}

validaClaveNueva() {
  if (this.model.confirmPassword == '') {
    if (this.model.password == '') {
      this.msgpas2 = 'Ingrese su nueva contraseña';
      this.vpas2 = true;
    } else {
      this.vpas2 = false;
    }
  }else {
    this.validaClaveConfirmacionNueva();
  }
}

validaClaveConfirmacionNueva() {
  if (this.model.confirmPassword != this.model.password) {
    this.vpas3 = true;
    this.bchangepassword = true;
  } else {
    this.vpas3 = false;
    this.bchangepassword = false;
  }
}

onSubmit() {
    if (this.elem) {
        if (this.elem.files.length >= 0) {
            let formData = new FormData();
            formData.append('fileImagen', this.elem.files[0]);
            formData.append('username', this.user.username);

            this.servUser.updateUserImage(formData).subscribe(
              data => {
                if (data.status === 201) {
                  this.openNotificacion(1, 'Correcto!', 'Se guardo correctamente el Cambio');
                  //this.router.navigate(['/admin/users/list']);
                }else {
                  this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
                }
              }, (err: HttpErrorResponse) => {
                // console.log('error!', err);
                this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
              }
            );
          }else {
            this.openNotificacion(3, 'Ocurrio un error', 'Revise el Formato o Tamaño de la Imagen');
          }
    }else {
      this.openNotificacion(2, 'Seleccione una', 'foto de Perfil');
    }
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
    this.user.usuario_modificacion = this.global.user.username;
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
    this.user.usuario_modificacion = this.global.user.username;
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
    this.user.usuario_creacion = this.global.user.username;
}

onChangePassword() {
  this.model.username = localStorage.getItem('username');
  this.model.usernameUpdate = localStorage.getItem('username');
  this.servUser.changePassword(this.model).subscribe(
    data => {
      this.toastService.show('Se cambio la contraseña correctamente!!', 4000, 'green rounded');
      this.global.user.estado = 1;
      this.router.navigate(['/home']);
    }, (err: HttpErrorResponse) => {
        this.toastService.show('Error: No se produjo el cambio!!', 4000, 'red rounded');
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

  onSelectCargo(selected: CompleterItem): void {
    if (selected) {
      this.user.id_cargo = selected.originalObject['id'];
      // console.log(this.user);
    } else {
      // console.log('Vacio');
    }
  }

  uploadImageUser(event) {
    this.elem = event.target;
    let img = document.querySelector('#preview img');
    let reader = new FileReader();
    this.readFile(event.target.files[0], reader, (result) => {
      this.isFileCharged = true;
      img.setAttribute('src', reader.result);
    });
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
        callback(reader.result);
    }
    reader.readAsDataURL(file);
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
}
