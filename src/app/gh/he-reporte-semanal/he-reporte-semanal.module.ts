import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzModalModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeReporteSemanalRoutingModule } from './he-reporte-semanal-routing.module';
import { HeReporteSemanalComponent } from './he-reporte-semanal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HeReporteSemanalRoutingModule,
        FormsModule,
        MzParallaxModule,
        MzSpinnerModule,
        MzCardModule,
        MzSelectModule,
        MzInputModule,
        MzRadioButtonModule,
        MzCheckboxModule,
        MzDatepickerModule,
        MzButtonModule,
        MzIconMdiModule,
        MzIconModule,
        MzSwitchModule,
        MzValidationModule,
        AmazingTimePickerModule,
        MzToastModule,
        AutocompleteLibModule,
        NgSelectModule,
        MzModalModule
    ],
    declarations: [HeReporteSemanalComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HeReporteSemanalModule {}
