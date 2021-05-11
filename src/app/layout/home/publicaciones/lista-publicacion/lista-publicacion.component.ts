import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { MzModalService } from 'ngx-materialize';
import { HomeService } from '../../home.service';
import { Globals } from '../../../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from '../../../../models/publicacion';

declare var $: any;

@Component({
  selector: 'app-lista-publicacion',
  templateUrl: './lista-publicacion.component.html',
  styleUrls: ['./lista-publicacion.component.scss']
})
export class ListaPublicacionComponent implements OnInit {
  @Input() publications: Array<Publicacion> = new Array<Publicacion>();

  public usuarioActual: string;

  public esExcel: boolean;
  public esWord: boolean;
  public esPdf: boolean;
  public esImagen: boolean;

  public urlImages: string;
  public urlImagesDocs: string;
  public pub: SafeResourceUrl;
  public urlViewer: string;

  constructor(
    private hSer: HomeService,
    private ngxModalPublicacion: NgxSmartModalService,
    private global: Globals,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.urlImages = this.global.urlPublicaciones;
    this.urlImagesDocs = this.global.urlImagesDocs;
    this.urlViewer = 'https://docs.google.com/viewer?url=';
  }

  ngOnInit() {
    this.usuarioActual = localStorage.getItem('username');
  }


  openVistaPrevia(name: string) {
    this.pub = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlViewer + this.global.urlPublicaciones + name + '&embedded=true');
    this.ngxModalPublicacion.getModal('myModalPublicacion').open();
  }

  abrirDoc(name: string) {
    let extension = name.split('.')[1];
    if(extension == 'jpg' || extension == 'png' || extension == 'JPG' || extension == 'PNG') {
      this.router.navigate(['/preview/' + name]);
    }else {
      this.router.navigate(['/detalle/' + name]);
    }
    //this.router.navigate(['/detalle/' + name]);
  }

  eliminarPublicacion(p: Publicacion){
      if(confirm('Estas seguro que quieres eliminar esta publicación?')){
        this.hSer.deletePublications(p.id).subscribe(
          data => {
              // console.log(data);
              location.reload();
              alert('Se eliminó la publicación');
          },
          (err: HttpErrorResponse) => {
            alert('No se pudo eliminar la publicación');
          }
      );
    } else {
      alert('No! se Eliminó')
    }
  }
  /*
  onLoadPublications(): void {
    this.hSer.getPublications().subscribe(
        data => {
            // console.log(data);
            this.publications = data.body;
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
  }*/
}
