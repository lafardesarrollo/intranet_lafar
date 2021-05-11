import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainscComponent } from './mainsc.component';

const routes: Routes = [
    {
        path: '', component: MainscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainscRoutingModule {

}
