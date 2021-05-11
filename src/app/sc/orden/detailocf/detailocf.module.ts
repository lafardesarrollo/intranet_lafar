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
import { DetailocfRoutingModule } from './detailocf-routing.module';
import { DetailocfComponent } from './detailocf.component';

@NgModule({
    imports: [
        CommonModule,
        DetailocfRoutingModule,
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
        DetailocfComponent
    ],
    providers: [
        SolicitudService, OrdenService, MzToastService, Comunes
    ]
})

export class DetailocfModule {}


