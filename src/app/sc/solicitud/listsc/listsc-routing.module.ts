import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListscComponent } from './listsc.component';

const routes: Routes = [
    {
        path: '', component: ListscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListscRoutingModule {

}
