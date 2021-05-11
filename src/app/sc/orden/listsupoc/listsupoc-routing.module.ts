import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsupocComponent } from './listsupoc.component';

const routes: Routes = [
    {
        path: '', component: ListsupocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListsupocRoutingModule {

}