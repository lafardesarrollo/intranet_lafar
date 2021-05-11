import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MzToastService, MzCardModule, MzSpinnerModule, MzIconMdiModule, MzButtonModule, MzIconModule, MzSelectModule,
    MzModalModule, MzInputModule
} from 'ngx-materialize';
import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsService } from './items.service';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ItemsRoutingModule,
        MzCardModule,
        MzSpinnerModule,
        MzButtonModule,
        MzIconMdiModule,
        MzIconModule,
        MzSelectModule,
        MzInputModule,
        MzModalModule,
        TreeViewModule,
        FormsModule
    ],
    declarations: [
        ItemsComponent
    ],
    providers: [
        ItemsService, MzToastService
    ]
})
export class ItemsModule {}
