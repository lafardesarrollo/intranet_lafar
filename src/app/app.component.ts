import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private global: Globals) {
  }
  ngOnInit() {
    if (localStorage.getItem('username') != null) {
      let urlOLDL = this.global.urlIntranet + 'sesionactiva.php' + '?username=' + localStorage.getItem('username');
      window.open(urlOLDL, '_blank');
      // console.log('TRUE');
      if (localStorage.getItem('estado') == '4') {
        this.router.navigate(['/admin/users/clave']);
      }
    }else {
      // console.log('FALSE');
      this.router.navigate(['/login']);
    }
  }

}
