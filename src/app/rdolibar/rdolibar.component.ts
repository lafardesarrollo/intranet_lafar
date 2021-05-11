import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
@Component({
  selector: 'app-rdolibar',
  templateUrl: './rdolibar.component.html',
  styleUrls: ['./rdolibar.component.scss']
})
export class RdolibarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public global: Globals) { }

  ngOnInit() {
    window.open(this.global.urlIntranet + 'lcc/dolibarr/', '_blank');
    this.router.navigate(['/home']);
  }

}
