import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-ghdocs',
  templateUrl: './ghdocs.component.html',
  styleUrls: ['./ghdocs.component.scss']
})
export class GhdocsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'ghdocs/', '_blank');
    this.router.navigate(['/home']);
  }

}
