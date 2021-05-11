import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzSpinnerModule, MzToastService,
    MzInputModule, MzDatepickerModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzNavbarModule, MzTextareaModule, MzSelectModule, MzToastModule, MzValidationModule, MzCheckboxModule, MzModalModule, MzModalService } from 'ngx-materialize';
import { DetailocRoutingModule } from './detailoc-routing.module';
import { DetailocComponent } from './detailoc.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { Comunes } from '../../../comunes';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MzTooltipModule } from 'ngx-materialize';

@NgModule({
    imports: [
        CommonModule,
        DetailocRoutingModule,
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
        MzModalModule,
        MzTooltipModule
    ],
    declarations: [
        DetailocComponent
    ],
    providers: [
        SolicitudService, OrdenService, MzToastService, Comunes
    ]
})

export class DetailocModule {}


