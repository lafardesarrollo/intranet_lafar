import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzSpinnerModule, MzToastService,
    MzInputModule, MzDatepickerModule, MzButtonModule, MzIconMdiModule, MzIconModule,
    MzNavbarModule, MzTextareaModule, MzSelectModule, MzToastModule, MzValidationModule,
    MzCheckboxModule, MzModalModule } from 'ngx-materialize';
import { DetailocsgRoutingModule } from './detailocsg-routing.module';
import { DetailocsgComponent } from './detailocsg.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { Comunes } from '../../../comunes';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        DetailocsgRoutingModule,
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
        DetailocsgComponent
    ],
    providers: [
        SolicitudService, OrdenService, MzToastService, Comunes
    ]
})

export class DetailocsgModule {}


