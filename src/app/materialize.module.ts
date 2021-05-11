import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TooltipModule } from "@syncfusion/ej2-angular-popups";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { MzButtonModule, MzCardModule, MzCheckboxModule, MzCollapsibleModule, MzCollectionModule, MzDatepickerModule, MzDropdownModule, MzIconMdiModule, MzIconModule, MzInputModule, MzModalModule, MzNavbarModule, MzRadioButtonModule, MzSelectModule, MzTabModule, MzTextareaModule, MzTimepickerModule, MzToastService, MzTooltipModule, MzValidationModule } from 'ngx-materialize';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MzButtonModule,
        MzCardModule,
        MzSelectModule,
        MzTabModule,
        MzCollapsibleModule,
        MzIconModule,
        MzIconMdiModule,
        MzModalModule,
        MzInputModule,
        MzCheckboxModule,
        MzRadioButtonModule,
        MzValidationModule,
        MzDatepickerModule,
        MzTimepickerModule,
        ReactiveFormsModule,
        MzTextareaModule,
        MzCollectionModule,
        MzTooltipModule,
        MzRadioButtonModule,
        TooltipModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        MzButtonModule,
        MzCardModule,
        MzSelectModule,
        MzTabModule,
        MzCollapsibleModule,
        MzIconModule,
        MzIconMdiModule,
        MzModalModule,
        MzInputModule,
        MzCheckboxModule,
        MzRadioButtonModule,
        MzValidationModule,
        MzDatepickerModule,
        MzTimepickerModule,
        ReactiveFormsModule,
        MzTextareaModule,
        MzCollectionModule,
        Ng2SearchPipeModule,
        MzTooltipModule,
        MzDropdownModule,
        MzNavbarModule,
        MzRadioButtonModule,
        TooltipModule
    ],
    providers: [
        MzToastService
    ]
})
export class MaterializeComponentesModule { }
