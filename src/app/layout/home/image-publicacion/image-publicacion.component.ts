import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-image-publicacion',
  templateUrl: './image-publicacion.component.html',
  styleUrls: ['./image-publicacion.component.scss']
})

export class ImagePublicacionComponent implements OnInit {
  _name_publicacion: string;
  public pub: SafeResourceUrl;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, public global: Globals) { }

  ngOnInit() {
    this._name_publicacion = this.route.snapshot.params['name'];
    this.pub = this.sanitizer.bypassSecurityTrustResourceUrl(this.global.urlPublicaciones + this._name_publicacion);
  }
}