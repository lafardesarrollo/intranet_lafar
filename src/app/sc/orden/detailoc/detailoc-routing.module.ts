import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailocComponent } from './detailoc.component';

const routes: Routes = [
    {
        path: '', component: DetailocComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailocRoutingModule {

}
