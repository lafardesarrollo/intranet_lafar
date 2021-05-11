import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-loading-pages',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})


export class LoadingComponent implements OnInit {

    @Input() estado: Boolean = true;

    constructor() {
        
    }
    ngOnInit() {
        if (this.estado) {
            this.openLoading();
        }else {
            this.closeLoading();
        }
    }

    openLoading() {
        const loading = $('#loadingPages');
        loading.fadeIn();
    }

    closeLoading() {
        const loading = $('#loadingPages');
        loading.fadeOut();
    }

}