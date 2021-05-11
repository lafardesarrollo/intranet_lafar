import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-dlbp',
  templateUrl: './dlbp.component.html',
  styleUrls: ['./dlbp.component.scss']
})

export class DlbpComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'dlbp/', '_blank');
    this.router.navigate(['/home']);
  }

}
