import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailscabasComponent } from './detailscabas.component';

const routes: Routes = [
    {
        path: '', component: DetailscabasComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailscabasRoutingModule {

}
