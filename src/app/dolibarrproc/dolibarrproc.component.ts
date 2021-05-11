import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dolibarrproc',
  templateUrl: './dolibarrproc.component.html',
  styleUrls: ['./dolibarrproc.component.scss']
})
export class DolibarrprocComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    // window.open('http://intranet.lafar.net/dolibarr_proc/htdocs/', '_blank');
    // this.router.navigate(['/home']);
    alert('Hola');
  }

}
