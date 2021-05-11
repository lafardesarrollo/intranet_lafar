import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-glv',
  templateUrl: './glv.component.html',
  styleUrls: ['./glv.component.scss']
})
export class GlvComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'bsl/', '_blank');
    this.router.navigate(['/home']);
  }

}
