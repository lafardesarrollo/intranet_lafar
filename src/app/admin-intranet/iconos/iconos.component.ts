import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-iconos',
  templateUrl: './iconos.component.html',
  styleUrls: ['./iconos.component.scss']
})
export class IconosComponent implements OnInit {

  icon1: string = 'email';
  icon2: string = 'account';
  constructor(
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    
  }
}
