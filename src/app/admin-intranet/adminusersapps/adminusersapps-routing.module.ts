import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersAppsComponent } from './adminusersapps.component';


const routes: Routes = [
    {
        path: '', component: AdminUsersAppsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminUsersAppsRoutingModule {
}
