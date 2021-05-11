import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindolibarrlccComponent } from './maindolibarrlcc.component';

const routes: Routes = [
    {
        path: '', component: MaindolibarrlccComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MaindolibarrlccRoutingModule {
}
