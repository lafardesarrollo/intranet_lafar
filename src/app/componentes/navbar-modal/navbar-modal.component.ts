import { Component, Input, OnInit } from '@angular/core';
import { Globals } from '../../globals';

@Component({
  selector: 'app-navbar-modal',
  templateUrl: './navbar-modal.component.html',
  styleUrls: ['./navbar-modal.component.scss']
})

export class NavbarModalComponent implements OnInit {
    @Input() titulo: string = '';

    loading = $('#loading');
    
    constructor() { }

    ngOnInit() {
        
    }

}