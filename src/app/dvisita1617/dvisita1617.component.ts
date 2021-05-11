import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dvisita1617',
  templateUrl: './dvisita1617.component.html',
  styleUrls: ['./dvisita1617.component.scss']
})
export class Dvisita1617Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'admin_dvisita_1617/', '_blank');
    this.router.navigate(['/home']);
  }

}
