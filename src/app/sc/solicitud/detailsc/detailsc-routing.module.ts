import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailscComponent } from './detailsc.component';

const routes: Routes = [
    {
        path: '', component: DetailscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailscRoutingModule {

}
