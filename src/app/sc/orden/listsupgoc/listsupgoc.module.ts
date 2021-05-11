import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule, MzIconMdiModule, MzBadgeModule, MzButtonModule, MzModalModule, MzToastService,
    MzDatepickerModule, MzInputModule, MzSelectModule, MzToastModule, MzTextareaModule, MzTooltipModule,
    MzSpinnerModule } from 'ngx-materialize';
import { ListsupgocRoutingModule } from './listsupgoc-routing.module';
import { ListsupgocComponent } from './listsupgoc.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { OrdenService } from '../orden.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        ListsupgocRoutingModule,
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
        ListsupgocComponent
    ],
    providers: [
        SolicitudService, MzToastService, OrdenService
    ]
})

export class ListsupgocModule {}
