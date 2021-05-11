import { Component, Input } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';
import { Seguimiento } from '../models/seguimiento.model';

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.scss'],
})
export class ModalMapaComponent extends MzBaseModal { 
    @Input() public seguimiento: Seguimiento;

    seg: Seguimiento = new Seguimiento();

    center: google.maps.LatLngLiteral;
    zoom = 16;
    markers = [];

    ngOnInit() {
        this.seg = this.seguimiento;
        console.log(this.seguimiento);
        this.addMarker();
        this.center = {lat: Number(this.seguimiento.latitud), lng: Number(this.seguimiento.longitud)};
    }    

    addMarker(){
        this.markers.push({
            position: {
                lat: Number(this.seguimiento.latitud),
                lng: Number(this.seguimiento.longitud)
            },
            label: {
                color: 'red',
                text: this.seguimiento.fecha_hora
            },
            title: this.seguimiento.descripcion,
            options:  { animation: google.maps.Animation.BOUNCE },
        })
    }
}