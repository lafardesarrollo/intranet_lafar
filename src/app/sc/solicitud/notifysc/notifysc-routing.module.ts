import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotifyscComponent } from './notifysc.component';

const routes: Routes = [
    {
        path: '', component: NotifyscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NotifyscRoutingModule {

}