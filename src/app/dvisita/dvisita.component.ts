import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-dvisita',
  templateUrl: './dvisita.component.html',
  styleUrls: ['./dvisita.component.scss']
})
export class DvisitaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'admin_dvisita/', '_blank');
    this.router.navigate(['/home']);
  }

}
