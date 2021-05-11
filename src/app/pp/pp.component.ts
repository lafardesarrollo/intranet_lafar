import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-pp',
  templateUrl: './pp.component.html',
  styleUrls: ['./pp.component.scss']
})
export class PpComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {

  }

}
