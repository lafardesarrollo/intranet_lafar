import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-ld',
  templateUrl: './ld.component.html',
  styleUrls: ['./ld.component.scss']
})
export class LdComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    //window.location.href = 'http://192.168.1.213/lafarnet/proforms_dos/';
    //window.open(this.global.urlIntranet + 'lafarnet/proforms_dos/', '_blank');
    window.open(this.global.urlLafarDocs, '_blank');
    this.router.navigate(['/home']);
  }

}
