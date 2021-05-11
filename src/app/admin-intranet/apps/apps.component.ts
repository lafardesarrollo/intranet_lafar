import { Component, OnInit } from '@angular/core';
import { AppsService } from './apps.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppsChk } from './appschk';
import { MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  lapps: Array<AppsChk> = new Array<AppsChk>();
  constructor(private servApps: AppsService, private route: Router,
    private toast: MzToastService) {
    this.onLoadAplicaciones();
  }

  ngOnInit() {

  }

  onLoadAplicaciones() {
    this.openLoading();
    this.servApps.getListadoAplicaciones().subscribe(
      data => {
        this.closeLoading();
        this.lapps = data['body'];
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las aplicaciones!', 1000, 'red');
      }
    );
  }

  abrirItem(app: AppsChk) {
    this.route.navigate(['/admin/items/' + app.id + '/' + app.appname]);
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
