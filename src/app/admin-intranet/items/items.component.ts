import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';
import { ItemApps, ItemTree, ItemMother, ItemAppsChildren } from './itemapps';
import { ItemsService } from './items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  litemmother: Array<ItemMother> = new Array<ItemMother>();
    item_app_principal: ItemAppsChildren = new ItemAppsChildren(); // Variable para NgModel de Items Principal
    item_app: ItemAppsChildren = new ItemAppsChildren(); // Variable para NgModel de Items

    selectedRows: any[];
    litems: Array<ItemApps> = new Array<ItemApps>();
    litemstree: Array<ItemTree> = new Array<ItemTree>();

    id_mother: number = 0;
    id_app: number = 0;
    app_name: string = '';
    public treeData: Object[] = [];
    public treeFields: Object = {
        dataSource: this.treeData,
        id: 'nodeId',
        text: 'nodeText',
        child: 'nodeChild'
    };

  constructor(private servItems: ItemsService, private toast: MzToastService, private router: ActivatedRoute) {
    // this.onLoadItems();
    this.router.params.subscribe(params => {
      this.id_app = params['id'];
      this.app_name = params['name'];
      this.item_app.app_id = this.id_app;
      this.onLoadTreeItems(this.id_app);
    });
  }

  ngOnInit() {

  }

  onLoadTreeItems(id: number) {
    this.openLoading();
    this.servItems.getItemsPorAplicacion(id).subscribe(
      data => {
        this.closeLoading();
        this.litemstree = data['body'];
        this.treeData = this.litemstree;
        this.treeFields = {
            dataSource: this.treeData,
            id: 'nodeId',
            text: 'nodeText',
            child: 'nodeChild'
        };
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener los Items!', 1000, 'red');
      }
    );
  }

  // Cargar los items
  onLoadItems() {
    this.openLoading();
    this.servItems.getItemsPorAplicacion(this.id_app).subscribe(
      data => {
        this.closeLoading();
        this.litems = data['body'];
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener los Items!', 1000, 'red');
      }
    );
  }

  // Obtiene los items principales por Id de Aplicacion
  onLoadItemMother(id_app: number) {
    this.openLoading();
    this.servItems.getItemsMotherPorIdApp(id_app).subscribe(
      data => {
        this.closeLoading();
        if (data['result']) {
          this.litemmother = data['body'];
        } else {
          this.toast.show('No trajo Items Principales', 1000, 'red');
        }
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener los Items!', 1000, 'red');
      }
    );
  }

  // Evento cuando se selecciona el Item Mother
  onSelectItemPrincipal() {
    this.item_app.id_mother = this.id_mother;
    this.item_app.tipo = 'c';
    this.item_app.usuario = localStorage.getItem('username');
  }

  habilitaAddItem() {
    this.item_app.usuario = localStorage.getItem('username');
    this.item_app_principal.usuario = localStorage.getItem('username');
    this.item_app_principal.id_mother = 0;
    this.item_app_principal.tipo = 'm';
    this.item_app_principal.app_id = this.id_app;
    this.onLoadItemMother(this.id_app);
  }

  // Funcion para agregar nuevo Item Principal
  guardarItemPrincipal() {
    this.openLoading();
    this.servItems.saveItemsApp(this.item_app_principal).subscribe(
      data => {
        this.closeLoading();
        if (data['result']) {
          this.onLoadTreeItems(this.id_app);
          this.habilitaAddItem();
          this.toast.show(data['message'], 1000, 'blue');
        } else {
          this.toast.show('No se guardo, Intente nuevamente', 1000, 'red');
        }
      }, (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error en el servidor', 1000, 'red');
      }
    );
  }

  CancelarGuardarItemPrincipal() {
    this.item_app_principal = new ItemAppsChildren();
    this.habilitaAddItem();
  }

  // Funcion para agregar nuevo Item
  guardarItem() {
    this.openLoading();
    this.servItems.saveItemsApp(this.item_app).subscribe(
      data => {
        this.closeLoading();
        if (data['result']) {
          this.onLoadTreeItems(this.id_app);
          this.toast.show(data['message'], 1000, 'blue');
        } else {
          this.toast.show('No se guardo, Intente nuevamente', 1000, 'red');
        }
      }, (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error en el servidor', 1000, 'red');
      }
    );
  }

  // Funciones Loading
  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
}
