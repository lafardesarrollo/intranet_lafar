import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dolibarrlcc',
  templateUrl: './dolibarrlcc.component.html',
  styleUrls: ['./dolibarrlcc.component.scss']
})
export class DolibarrlccComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    window.open(this.global.urlIntranet + 'dolibarrlcc/htdocs/', '_blank');
    this.router.navigate(['/home']);
  }

}
