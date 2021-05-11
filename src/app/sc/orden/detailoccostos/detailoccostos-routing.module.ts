import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailoccostosComponent } from './detailoccostos.component';

const routes: Routes = [
    {
        path: '', component: DetailoccostosComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailoccostosRoutingModule {

}
