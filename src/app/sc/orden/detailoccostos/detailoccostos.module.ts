import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzSpinnerModule, MzToastService,
    MzInputModule, MzDatepickerModule, MzButtonModule, MzIconMdiModule, MzIconModule,
    MzNavbarModule, MzTextareaModule, MzSelectModule, MzToastModule, MzValidationModule,
    MzCheckboxModule, MzModalModule } from 'ngx-materialize';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { Comunes } from '../../../comunes';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetailoccostosRoutingModule } from './detailoccostos-routing.module';
import { DetailoccostosComponent } from './detailoccostos.component';

@NgModule({
    imports: [
        CommonModule,
        DetailoccostosRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzSpinnerModule,
        FormsModule,
        MzInputModule,
        MzDatepickerModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzNavbarModule,
        MzTextareaModule,
        MzSelectModule,
        MzToastModule,
        MzValidationModule,
        NgSelectModule,
        MzCheckboxModule,
        MzModalModule
    ],
    declarations: [
        DetailoccostosComponent
    ],
    providers: [
        SolicitudService, OrdenService, MzToastService, Comunes
    ]
})

export class DetailoccostosModule {}


