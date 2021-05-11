import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListscsupComponent } from './listscsup.component';

const routes: Routes = [
    {
        path: '', component: ListscsupComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListscsupRoutingModule {

}
