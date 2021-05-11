import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule, MzToastService } from 'ngx-materialize';
import { TrackingDiarioRoutingModule } from './tracking-diario-routing.module';
import { TrackingDiarioComponent } from './tracking-diario.component';
import { TrackingService } from '../tracking.service';
import { ComponentesModule } from '../../componentes/componentes.module';
import { MaterializeComponentesModule } from '../../materialize.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalMapaComponent } from '../modal-mapa/modal-mapa.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        TrackingDiarioRoutingModule,
        MaterializeComponentesModule,
        GoogleMapsModule,
        FormsModule
    ],
    declarations: [TrackingDiarioComponent, ModalMapaComponent],
    entryComponents: [
        ModalMapaComponent
    ],
    providers: [
        TrackingService,
        MzToastService
    ]
})

export class TrackingDiarioModule {}
