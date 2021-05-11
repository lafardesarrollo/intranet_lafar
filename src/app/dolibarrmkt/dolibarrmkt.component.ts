import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dolibarrmkt',
  templateUrl: './dolibarrmkt.component.html',
  styleUrls: ['./dolibarrmkt.component.scss']
})
export class DolibarrmktComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    window.open(this.global.urlIntranet + 'dolibarr/htdocs/', '_blank');
    this.router.navigate(['/home']);
  }

}
