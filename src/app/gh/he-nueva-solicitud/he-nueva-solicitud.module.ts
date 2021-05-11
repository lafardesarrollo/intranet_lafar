import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzModalModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HeNuevaSolicitudRoutingModule } from './he-nueva-solicitud-routing.module';
import { HeNuevaSolicitudComponent } from './he-nueva-solicitud.component';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        HeNuevaSolicitudRoutingModule,
        ReactiveFormsModule,
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
    declarations: [HeNuevaSolicitudComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HeNuevaSolicitudModule {}
