import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MzButtonModule, MzIconModule, MzIconMdiModule } from 'ngx-materialize';


@NgModule({
    imports: [
        CommonModule,
        OrganizationsRoutingModule,
        NgxDatatableModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule
    ],
    declarations: [
        OrganizationsComponent
    ]
})
export class OrganizationsModule {}
