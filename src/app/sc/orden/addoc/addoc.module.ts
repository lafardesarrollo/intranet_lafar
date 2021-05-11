import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzButtonModule, MzInputModule, MzIconMdiModule,
    MzDatepickerModule, MzIconModule, MzNavbarModule, MzSelectModule, MzTextareaModule,
    MzModalModule, MzToastModule, MzValidationModule, MzCollectionModule, MzBadgeModule,
    MzSpinnerModule, MzToastService, MzCheckboxModule, MzTooltipModule, MzSidenavModule } from 'ngx-materialize';
import { AddocRoutingModule } from './addoc-routing.module';
import { AddocComponent } from './addoc.component';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Globals } from '../../../globals';
import { OrdenService } from '../orden.service';
import { UsersService } from '../../../admin-intranet/users/users.service';
import { Comunes } from '../../../comunes';

@NgModule({
    imports: [
        CommonModule,
        AddocRoutingModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzNavbarModule,
        MzInputModule,
        MzSelectModule,
        MzDatepickerModule,
        MzTextareaModule,
        MzModalModule,
        MzToastModule,
        FormsModule,
        ReactiveFormsModule,
        MzValidationModule,
        NgSelectModule,
        MzCollectionModule,
        MzBadgeModule,
        MzSpinnerModule,
        MzCheckboxModule,
        MzTooltipModule,
        MzSidenavModule
    ],
    declarations: [
        AddocComponent
    ],
    providers: [
        SolicitudService, OrdenService, UsersService, MzToastService, Globals, Comunes
    ]
})

export class AddocModule {}
