import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailocgComponent } from './detailocg.component';

const routes: Routes = [
    {
        path: '', component: DetailocgComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailocgRoutingModule {

}
