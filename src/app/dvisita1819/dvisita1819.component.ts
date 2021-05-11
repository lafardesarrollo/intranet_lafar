import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dvisita1819',
  templateUrl: './dvisita1819.component.html',
  styleUrls: ['./dvisita1819.component.scss']
})
export class Dvisita1819Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'admin_dvisita_1819/', '_blank');
    this.router.navigate(['/home']);
  }

}
