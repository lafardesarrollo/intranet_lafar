import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersAppsRoutingModule } from './adminusersapps-routing.module';
import { AdminUsersAppsComponent } from './adminusersapps.component';
import {AppsService } from '../apps/apps.service';
import {
    MzNavbarModule,
    MzTabModule,
    MzCheckboxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzParallaxModule,
    MzRadioButtonModule,
    MzSelectModule,
    MzCollapsibleModule
} from 'ngx-materialize';
import { UsersAppsService } from './usersapps.service';

@NgModule({
    imports: [
        CommonModule,
        AdminUsersAppsRoutingModule,
        MzNavbarModule,
        MzTabModule,
        MzCheckboxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        MzParallaxModule,
        MzRadioButtonModule,
        MzSelectModule,
        MzCollapsibleModule
    ],
    declarations: [
        AdminUsersAppsComponent
    ],
providers: [
     AppsService, UsersAppsService
]
})
export class AdminUsersAppsModule {}
