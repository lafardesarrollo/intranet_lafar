import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsupgocComponent } from './listsupgoc.component';

const routes: Routes = [
    {
        path: '', component: ListsupgocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListsupgocRoutingModule {

}