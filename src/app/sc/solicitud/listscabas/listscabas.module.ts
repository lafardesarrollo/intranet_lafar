import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzDatepickerModule, MzInputModule, 
    MzSelectModule, MzToastService, MzToastModule, MzTextareaModule, MzTooltipModule, MzSpinnerModule } from 'ngx-materialize';
import { SolicitudService } from '../solicitud.service';
import { ListscabasRoutingModule } from './listscabas-routing.module';
import { ListscabasComponent } from './listscabas.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        ListscabasRoutingModule,
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
        MzSpinnerModule
    ],
    declarations: [
        ListscabasComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class ListscabasModule {}
