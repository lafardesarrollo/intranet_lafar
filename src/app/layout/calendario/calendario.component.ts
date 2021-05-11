import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    // window.open('https://app.smartsheet.com/b/form/9e7355bd9cad424abbcd8342492257d0'); // Formulario de Registro
    window.open('https://app.smartsheet.com/b/home?lx=WAULvew8kPp23wG8BEK6cg');
  }

}
