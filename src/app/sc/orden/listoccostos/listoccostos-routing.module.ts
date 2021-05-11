import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListoccostosComponent } from './listoccostos.component';

const routes: Routes = [
    {
        path: '', component: ListoccostosComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListoccostosRoutingModule {

}