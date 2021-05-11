import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AppsForUser } from './appsforuser';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Globals } from '../../../globals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    public appsforuser: AppsForUser;
    public apps: any;
    public modalOptions: Materialize.ModalOptions = {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
          // alert('Ready');
          // console.log(modal, trigger);
        },
        complete: () => { /*alert('Closed');*/ } // Callback for Modal close
    };

    constructor(
        private servicioLayout: LayoutService,
        public ngxSmartModalService: NgxSmartModalService, private global: Globals) {

    }

    ngOnInit() {
        this.onLoadApps(localStorage.getItem('username'));
    }

    onLoadApps(username): void {
        this.appsforuser = new AppsForUser(username);
        this.servicioLayout.AppsForUser(this.appsforuser).subscribe(
            data => {
                // console.log(data);
                this.apps = data.body;
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                // console.log('Ocurrio un error:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
              }
            }
        );
    }

    openAplicacionExterna(item: any){
        console.log(item);
        window.location.href = this.global.urlIntranetLCC + item.url;
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
