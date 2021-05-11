import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolComponent } from './rol.component';
import { RolRoutingModule } from './rol-routing.module';
import { MzCardModule, MzToastService, MzToastModule, MzCollectionModule, MzTooltipModule, MzCollapsibleModule,
    MzButtonModule, MzModalModule, MzInputModule, MzIconMdiModule, MzTextareaModule, MzValidationModule, MzCheckboxModule 
} from 'ngx-materialize';
import { AdminIntranetService } from '../admin-intranet.service';
import { RolesService } from '../roles/roles.service';
import { LayoutService } from '../../layout/layout.service';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../items/items.service';

@NgModule({
    imports: [
        CommonModule,
        RolRoutingModule,
        MzCardModule,
        MzToastModule,
        MzCollectionModule,
        MzTooltipModule,
        MzCollapsibleModule,
        MzButtonModule,
        MzModalModule,
        MzInputModule,
        MzIconMdiModule,
        MzTextareaModule,
        MzValidationModule,
        MzCheckboxModule,
        FormsModule
    ],
    declarations: [
        RolComponent
    ],
    providers: [
        AdminIntranetService, MzToastService, RolesService, LayoutService, ItemsService
    ]
})
export class RolModule {}
