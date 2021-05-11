import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-lfrcli',
  templateUrl: './lfrcli.component.html',
  styleUrls: ['./lfrcli.component.scss']
})
export class LfrcliComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    window.open(this.global.urlIntranet + 'lfrcli/', '_blank');
    this.router.navigate(['/home']);
  }

}
