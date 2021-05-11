import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { MzSidenavComponent } from 'ngx-materialize';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { NavigationEnd, Route, Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { ItemForApp, RequestUserRol } from './itemforapp';
import { HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Users } from '../../../admin-intranet/users/users';
import { Login } from '../../../login/login';
import { filter } from 'rxjs/operators';

abstract class SectionRoutesPair {
    section: string;
    routes: Route[];
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sidenav') sidenav: MzSidenavComponent;
    @Input() idapp: any;
    public items: any;
    groupedRoutes: Array<SectionRoutesPair>;
    scrollElement: JQuery;
    public itemforapp: ItemForApp;
    user: Users = new Users();

    public ura: RequestUserRol = new RequestUserRol();

    constructor(
      private router: Router,
      private mScrollbarService: MalihuScrollbarService,
      private lservice: LayoutService,
      public global: Globals
    ) { }

    ngOnInit() {
      this.ura.id_app = this.idapp;
      this.ura.username = localStorage.getItem('username');
      // this.getItemForApps(this.idapp);
      this.getRolForUser(this.ura);
      this.populateSideNavWithRoutesGroupedBySections();
      this.setNavigationEndEvent();
      // console.log('ngOnInit');
      this.onLoadUserInformation();
    }

    ngAfterViewInit() {
      this.initElement();
      this.initScrollbar();
      // console.log('ngAfterViewInit');
    }

    ngOnDestroy() {
      this.mScrollbarService.destroy(this.scrollElement);
      // console.log('ngOnDestroy');
    }

    initElement() {
      this.scrollElement = $(`#${this.sidenav.id}`);
    }

    initScrollbar() {
      this.mScrollbarService.initScrollbar(this.scrollElement, { axis: 'y', theme: 'minimal', scrollInertia: 100 });
    }

    populateSideNavWithRoutesGroupedBySections() {
      // Take all routes with data and group them by sections
      this.groupedRoutes = this.router.config.reduce<Array<SectionRoutesPair>>(
        (returnValues, currentValue) => {
          if (currentValue.data) {
            const section = currentValue.data['section'];
            const existingSection = returnValues.find((r) => r && r.section === section);

            if (existingSection) {
              existingSection.routes.push(currentValue);
            } else {
              returnValues.push({ section: section, routes: [currentValue] });
            }
          }
          return returnValues;
        },
        new Array<SectionRoutesPair>());
    }

    setNavigationEndEvent() {
      // scroll to top on each route change
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(()=> {
        window.scrollTo(0, 0);
      });
        
    }

    onLoggedout() {
      localStorage.removeItem('isLoggedin');
      // localStorage.removeAll();
    }
    onLoadUserInformation() {
      this.user.userid = localStorage.getItem('userid');
      this.user.first_name = localStorage.getItem('first_name');
      this.user.last_name = localStorage.getItem('last_name');
      this.user.email_address = localStorage.getItem('email_address');
      this.user.username = localStorage.getItem('username');
      this.user.password = localStorage.getItem('password');
      this.user.id_cargo = localStorage.getItem('id_cargo');
      this.user.cargo = localStorage.getItem('cargo');
      this.user.id_regional = localStorage.getItem('id_regional');
      this.user.regional = localStorage.getItem('regional');
      this.user.id_grupo = localStorage.getItem('id_grupo');
      this.user.id_superior = localStorage.getItem('id_superior');
      this.user.id_area = localStorage.getItem('id_area');
      this.user.area = localStorage.getItem('area');
      this.user.id_seccion = localStorage.getItem('id_seccion');
      this.user.foto = localStorage.getItem('foto');
      this.user.estado = Number(localStorage.getItem('estado'));
      this.user.usuario_creacion = localStorage.getItem('usuario_creacion');
      this.user.fecha_creacion = localStorage.getItem('fecha_creacion');
      this.user.usuario_modificacion = localStorage.getItem('usuario_modificacion');
      this.user.fecha_modificacion = localStorage.getItem('fecha_modificacion');
  }

    getItemForApps(idApp): void {
      this.itemforapp = new ItemForApp(idApp);
      this.lservice.ItemForAppsW(idApp).subscribe(
        data => {
          // console.log(data.body);
          this.items = data.body;
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

    getRolForUser(datos: RequestUserRol): void {
      this.lservice.getRolForUser(datos).subscribe(
        data => {
          let id_rol: number = data.body.id_rol;
          // console.log(id_rol);
          this.getItemForRol(id_rol);
          //this.items = data.body;
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

    getItemForRol(id_rol): void {
      this.itemforapp = new ItemForApp(id_rol);
      this.lservice.ItemForAppsW(id_rol).subscribe(
        data => {
          // console.log(id_rol);
          this.items = data.body;
          //this.items = data.body;
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
