import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzModalModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeNuevaSolicitudghRoutingModule } from './he-nueva-solicitudgh-routing.module';
import { HeNuevaSolicitudghComponent } from './he-nueva-solicitudgh.component';

@NgModule({
    imports: [
        CommonModule,
        HeNuevaSolicitudghRoutingModule,
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
    declarations: [HeNuevaSolicitudghComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HeNuevaSolicitudghModule {}
