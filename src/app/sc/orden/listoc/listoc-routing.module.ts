import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListocComponent } from './listoc.component';

const routes: Routes = [
    {
        path: '', component: ListocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListocRoutingModule {

}