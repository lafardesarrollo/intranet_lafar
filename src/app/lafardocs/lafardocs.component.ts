import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-lafardocs',
  templateUrl: './lafardocs.component.html',
  styleUrls: ['./lafardocs.component.scss']
})
export class LafardocsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'lafardocs/', '_blank');
    this.router.navigate(['/home']);
  }

}
