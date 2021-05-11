import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzModalModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeReporteMensualRoutingModule } from './he-reporte-mensual-routing.module';
import { HeReporteMensualComponent } from './he-reporte-mensual.component';
import { NombreMesPipe } from './nombre-mes.pipe';

@NgModule({
    imports: [
        CommonModule,
        HeReporteMensualRoutingModule,
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
    declarations: [HeReporteMensualComponent, NombreMesPipe ],
    providers: [HorasExtrasService, MzToastService]
})

export class HeReporteMensualModule {}
