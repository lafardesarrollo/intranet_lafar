import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchsc',
  templateUrl: './searchsc.component.html',
  styleUrls: ['./searchsc.component.scss'],
})
export class SearchscComponent implements OnInit {
  codigo_solicitud: string = '';
  errorMessagesSolicitud = {
    codigo_solicitud: {
        required: 'Ingrese un Codigo de Solicitud'
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  openOrdenCompra() {
    this.router.navigate(['/sc/orden/add/' + this.codigo_solicitud]);
  }
}
