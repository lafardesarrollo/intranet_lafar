import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotifyocComponent } from './notifyoc.component';

const routes: Routes = [
    {
        path: '', component: NotifyocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NotifyocRoutingModule {

}