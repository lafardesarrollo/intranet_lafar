import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule } from 'ngx-materialize';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        SolicitudRoutingModule,
        MzParallaxModule,
        MzCardModule,
        NgxPaginationModule
    ],
    declarations: [
        SolicitudComponent
    ]
})

export class SolicitudModule {}
