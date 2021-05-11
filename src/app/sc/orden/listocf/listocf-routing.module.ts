import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListocfComponent } from './listocf.component';

const routes: Routes = [
    {
        path: '', component: ListocfComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListocfRoutingModule {

}