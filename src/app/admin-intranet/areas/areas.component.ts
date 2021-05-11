import { Component, OnInit } from '@angular/core';
import { Areas } from './areas';
import { AreasService } from './areas.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  area: Areas;
  areas: any;
  filter: any;
  // Ordenacion
  key: string = 'nombre';
  reverse: boolean = false;

  constructor(public servArea: AreasService) { }

  ngOnInit() {
    this.onLoadAreas();
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

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;
}
