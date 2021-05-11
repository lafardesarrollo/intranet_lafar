import { Component, OnInit } from '@angular/core';
import { AdminIntranetService } from '../admin-intranet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppsChk } from '../apps/appschk';
import { MzToastService } from 'ngx-materialize';
import { toASCII } from 'punycode';
import { RolesService } from '../roles/roles.service';
import { Rol } from '../roles/roles';
import { LayoutService } from '../../layout/layout.service';
import { ItemsService } from '../items/items.service';
import { RequestItemsAppsAsignado, ItemApps } from '../items/itemapps';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  // Request para obtener items asignados o no
  req: RequestItemsAppsAsignado = new RequestItemsAppsAsignado();

  public rol: Rol = new Rol(); // Objeto de tipo Rol
  public litems: any; // Lista de Items
  public litemsasignadas: Array<ItemApps>; // Lista de Items Asignadas
  
  public nombre_aplicacion: string = '';
  public codigo_aplicacion: string = '';
  public nombre_rol: string = '';

  public lapps: Array<AppsChk> = new Array<AppsChk>();
  public lrol: Array<Rol> = new Array<Rol>();

  // Array de Errores 
  errorMessagesRol = {
    nombre_rol: {
        required: 'Ingrese un Nombre',
    },
    descripcion: {
        required: 'Ingrese una Descripción',
    }
  };


  constructor(private servIntranet: AdminIntranetService,
    private toast: MzToastService,
    private servRoles: RolesService,
    private servItems: LayoutService,
    private servItem: ItemsService) {
      this.rol.id_rol = 0;
      this.rol.descripcion = '';
  }

  ngOnInit() {
    // console.log('Bienvenido a la pagina Rol');
    this.onLoadAplicaciones();
  }

  // Función que consume y carga todas las aplicaciones de la Intranet
  onLoadAplicaciones(){
    this.servIntranet.getAplicaciones().subscribe(
        data => {
          // console.log(data);
          // console.log(data['body']);
          this.lapps = data['body'];
          // this.toast.show('Las aplicaciones fueron cargadas correctamente!', 1000, 'green');
           // alert("ok");
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Error al traer las aplicaciones!', 1000, 'red');
          // alert("Error");
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }

  // Funcion consume el servicio que obtiene los roles por aplicación
  onLoadRoles(code){
    this.servRoles.getRolesForApps(code).subscribe(
        data => {
            this.lrol = data['body'];
          // console.log('Roles Cargados Correctamente!!');
          // console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }

  // Funcion que carga los roles de cada aplicación 
  seleccionarAplicacion(app: AppsChk){
    this.req.app_id = app.id;
    this.nombre_aplicacion = app.appname;
    this.rol.codigo_app = app.code;
    this.codigo_aplicacion = app.code;
    this.onLoadRoles(app.code);
    // alert(app.appname);
    // // console.log(this.rol);
  }

  // Función que permite cargar los Items dado un Rol
  onLoadItemsForRol(rol: Rol){
    this.rol = rol;
    // alert(codigo_rol);
    this.req.id_rol = rol.id_rol;
    this.litems = [];
    this.servItems.ItemForAppsW(rol.id_rol).subscribe(
        data => {
          this.litems = data['body'];
          this.nombre_rol = rol.nombre_rol;
          // this.toast.show(data['length'], 500, 'green');
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error al cargar los Items. Intente nuevamente', 500, 'red');
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }

  //#region ITEMS ASIGNADAS
  // Función que muestra todos los item asignados y no asignados
  onLoadItemsAsignadas(request: RequestItemsAppsAsignado) {
    this.litemsasignadas = [];
    this.servItem.getItemAsignadas(request).subscribe(
        data => {
          this.litemsasignadas = data['body'];
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error al cargar los Items Asignados. Intente nuevamente', 1000, 'red');
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }

  modificarAsignacion() {
    this.servItem.modificarAsignacionItemsRol(this.rol.id_rol, this.litemsasignadas).subscribe(
      data => {
        this.onLoadItemsForRol(this.rol);
        this.toast.show('Se modifico correctamente la asignación.', 1000, 'green');
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al modificar. Intente nuevamente', 1000, 'red');
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }
  //#endregion

  // Funcion consume el servicio para guardar un nuevo Rol
  onSaveRol(rol: Rol){
    this.servRoles.addRol(rol).subscribe(
        data => {
            if (data['result'] === true){
              this.toast.show('Se guardo correctamente', 500, 'green');
            } else {
              this.toast.show('No se guardo! verifique la información', 500, 'red');
            }
            this.rol.descripcion = '';
            this.rol.nombre_rol = '';
            this.onLoadRoles(rol.codigo_app);
        },
        (err: HttpErrorResponse) => {
          this.toast.show('Ocurrio un error en el Servidor!', 500, 'red');
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
    );
  }
}
