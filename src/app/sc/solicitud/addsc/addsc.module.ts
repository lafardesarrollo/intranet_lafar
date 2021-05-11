import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddscRoutingModule } from './addsc-routing.module';
import { AddscComponent } from './addsc.component';
import { MzCardModule, MzButtonModule, MzIconModule, MzNavbarModule, MzInputModule, MzSelectModule, MzDatepickerModule,
    MzIconMdiModule, MzTextareaModule, MzModalModule, MzToastService, MzToastModule, MzValidationModule, MzCollectionModule,
    MzBadgeModule, MzSpinnerModule, MzTooltipModule } from 'ngx-materialize';
import { SolicitudService } from '../solicitud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Comunes } from '../../../comunes';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { Globals } from '../../../globals';

@NgModule({
    imports: [
        CommonModule,
        AddscRoutingModule,
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
        MzTooltipModule,
        DialogModule, ListViewModule,
        UploaderModule,
        ComboBoxModule,
        RadioButtonModule
    ],
    declarations: [
        AddscComponent
    ],
    providers: [
        SolicitudService, MzToastService, Comunes, Globals
    ]
})

export class AddscModule {}
