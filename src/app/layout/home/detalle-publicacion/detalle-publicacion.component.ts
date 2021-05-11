import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.scss']
})
export class DetallePublicacionComponent implements OnInit {
  _name_publicacion: string;
  public pub: SafeResourceUrl;
  urlViewer: string = 'https://docs.google.com/viewer?url=';

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, public global: Globals) { }

  ngOnInit() {
    this._name_publicacion = this.route.snapshot.params['name'];
    this.pub = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlViewer + this.global.urlPublicaciones + this._name_publicacion + '&embedded=true');
    //alert(this.pub);
  }

}
