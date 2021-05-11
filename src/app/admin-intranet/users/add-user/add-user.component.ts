import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { Users } from '../users';
import { NgForm, EmailValidator, FormGroup, FormBuilder } from '@angular/forms';
import { CargosService } from '../../cargos/cargos.service';
import { Cargos } from '../../cargos/cargos';
import { HttpErrorResponse } from '@angular/common/http';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AreasService } from '../../areas/areas.service';
import { Areas } from '../../areas/areas';
import { Regionales } from '../../regionales/regionales';
import { RegionalesService } from '../../regionales/regionales.service';
import { CompleterItem } from 'ng2-completer/components/completer-item';
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  usuarios: Array<Users>;
  elem: any;
  userForm: FormGroup;
  cargoData: CompleterData;
  userData: CompleterData;
  cargo: Cargos;
  cargos: any;
  area: Areas;
  areas: any;
  regional: Regionales;
  regionales: any;
  submitted = false;
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

  public selectedFiles;
  urlFotoPerfil: string;

  UserModel = new Users();

  constructor(
    private router: Router,
    private servNotification: NotificationsService,
    private global: Globals,
    private servCargo: CargosService,
    private completerService: CompleterService,
    private completerServiceUser: CompleterService,
    private servArea: AreasService,
    private servRegional: RegionalesService,
    private servUser: UsersService,
    private servToast: MzToastService
  ) {
    this.onLoadCargos();
    this.onLoadAreas();
    this.onLoadRegionales();
  }

  ngOnInit() {


    /*this.UserModel.first_name = 'Franz';
    this.UserModel.last_name = 'Aruni';
    this.UserModel.email_address = 'amrfranz@gmail.com';
    this.UserModel.id_area = '1';
    this.UserModel.id_regional = '1';*/
    this.onLoadUsuarios();
    this.urlFotoPerfil = this.global.urlImagenUserDefault;
    
  }

  onSubmit() {
    if (this.elem) {
      this.submitted = true;
      if (this.elem.files.length >= 0) {
        let formData = new FormData();
        formData.append('fileImagen', this.elem.files[0]);
        formData.append('userid', this.UserModel.userid);
        formData.append('first_name', this.UserModel.first_name);
        formData.append('last_name', this.UserModel.last_name);
        formData.append('email_address', this.UserModel.email_address);
        formData.append('username', this.UserModel.username);
        formData.append('password', this.UserModel.password);
        formData.append('id_cargo', this.UserModel.id_cargo);
        formData.append('id_regional', this.UserModel.id_regional);
        formData.append('id_grupo', '1');
        formData.append('id_superior', '0');
        formData.append('id_area', this.UserModel.id_area);
        formData.append('id_seccion', '1');
        formData.append('foto', this.UserModel.username + '.png');
        formData.append('estado', '4');
        formData.append('usuario_modificacion', this.global.user.username);
        formData.append('usuario_creacion', this.global.user.username);

        this.servUser.setUser(formData).subscribe(
          data => {
            if (data.status === 201) {
              this.openNotificacion(1, 'Correcto!', 'Se agrego el Usuario');
              this.router.navigate(['/admin/users/list']);
            }else {
              this.openNotificacion(3, 'No se guardo', 'Intente nuevamente!');
            }
          }, (err: HttpErrorResponse) => {
            // console.log('error!', err);
            this.openNotificacion(3, 'Ocurrio un error', 'Comuniquese con el Administrador');
          }
        );
      }else {
        // console.log('NO');
      }
    }else {
      this.openNotificacion(2, 'Seleccione una', 'foto de Perfil');
    }
  }

  uploadImageUser(event) {
    this.elem = event.target;
    // // console.log(event.target.files[0]);
    let img = document.querySelector('#preview img');
    let reader = new FileReader();
    this.readFile(event.target.files[0], reader, (result) => {
      img.setAttribute('src', reader.result);
    });
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
        callback(reader.result);
     }
    reader.readAsDataURL(file);
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

  onLoadUsuarios(): void {
    this.usuarios = new Array<Users>();
    this.servUser.getUsersCompleter().subscribe(
    data => {
      this.usuarios = data.body;
      // console.log('Usuarios cargados correctamente');
      this.userData = this.completerService.local(this.usuarios, 'email_address', 'email_address');
      // console.log('------------------------------------>');
      // console.log(this.userData);
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

  onCambioUsername(user: string) {
    // alert(user);
    let c ;
      this.servUser.getCountUsersByUsername(user).subscribe(
      data => {
        // this.areas = data.body;
        // console.log('conteo de usuarios');
        data.body.forEach(element => {
          c = parseInt (element.cant);
          if ( c > 0 ) {
            // this.openNotificacion(3, 'Alerta',  this.UserModel.username + ' ya esta en uso');
            this.servToast.show('El nombre de usuario \"' + this.UserModel.username + '\" ya esta en uso', 10000, 'red rounded');
            this.UserModel.username = '';
            document.getElementById('username').focus();
          } else {
            this.servToast.show('El nombre de usuario \"' + this.UserModel.username + '\" esta disponible', 10000, 'green rounded');
          }
          // console.log(c);

        });
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

  buildForm() {

  }

  onSelectCargo(selected: CompleterItem): void {
    if (selected) {
      this.UserModel.id_cargo = selected.originalObject['id'];
      // console.log(this.UserModel);
    } else {
      // console.log('Vacio');
    }
  }

  onSelectUsuario() {

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