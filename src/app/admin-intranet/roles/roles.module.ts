import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';
import { MzCheckboxModule, MzCardModule, MzSelectModule, MzToastService } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RolesRoutingModule,
        MzCheckboxModule,
        MzCardModule,
        MzSelectModule,
        FormsModule
    ],
    declarations: [
        RolesComponent
    ],
    providers:[
        RolesService,
        MzToastService
    ]
})
export class RolesModule {}
