import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddscComponent } from './addsc.component';

const routes: Routes = [
    {
        path: '', component: AddscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddscRoutingModule {

}
