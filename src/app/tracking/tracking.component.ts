import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'tracking-calidad',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    
  }
}
