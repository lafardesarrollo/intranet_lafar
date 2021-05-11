import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddocComponent } from './addoc.component';

const routes: Routes = [
    {
        path: '', component: AddocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddocRoutingModule {

}
