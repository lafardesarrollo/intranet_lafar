import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule, MzButtonModule, MzModalModule, MzToastService,
    MzDatepickerModule, MzInputModule, MzSelectModule, MzToastModule, MzTextareaModule, MzTooltipModule,
    MzSpinnerModule } from 'ngx-materialize';
import { ListocRoutingModule } from './listoc-routing.module';
import { ListocComponent } from './listoc.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
    imports: [
        CommonModule,
        ListocRoutingModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzModalModule,
        MzDatepickerModule,
        MzInputModule,
        MzSelectModule,
        MzToastModule,
        MzTextareaModule,
        MzTooltipModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        MzSpinnerModule,
        DialogModule
    ],
    declarations: [
        ListocComponent
    ],
    providers: [
        SolicitudService, MzToastService, OrdenService
    ]
})

export class ListocModule {}
